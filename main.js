import {
  enableActivityTracking,
  newTracker,
  setReferrerUrl,
  trackPageView,
  trackSelfDescribingEvent,
} from '@snowplow/browser-tracker'
import { LinkClickTrackingPlugin, enableLinkClickTracking } from '@snowplow/browser-plugin-link-click-tracking';

const appParams = window.jobmatix.p || {}
const functionsQueue = window.jobmatix.q || []
const collectorUrl = 'https://pixel.jobmatix.app'
const sourceLinks = ['https://unpkg.com/@jobmatix.com/pixel/script.min.js', 'https://unpkg.com/@jobmatix.com/pixel/jm.min.js', './script.min.js']

const acceptedEnvs = ['production', 'local', 'development', 'demo', 'uat']
const acceptedConversionTypes = ['applicant', 'apply_start', 'job_alert', 'resume', 'register']
const conversionKeys = {
  type: 'conversion_type',
}

const trackFunctions = {
  enableActivityTracking,
  setReferrerUrl,
  trackPageView,
  trackSelfDescribingEvent,
  enableLinkClickTracking,
  conversion: jobmatixConversion,
};

const trackedId = appParams?.pixel_id ? 'jm' : 'sp';
const cookieName = `_${trackedId}_`;

// Get pixel id
(() => {
  if (appParams?.pixel_id) {
    return
  }
  const scripts = sourceLinks.map((src) => document.querySelector(`script[src="${src}"]`)).filter(el => el)
  appParams.pixel_id = scripts?.[0]?.getAttribute('id') || ''
})();

// Validate params
(() => {
  if (!appParams?.environment) {
    appParams.environment = 'production'
  }

  if (!appParams?.pixel_id) {
    throw new Error('Pixel ID not found')
  }

  if (!acceptedEnvs.includes(appParams?.environment)) {
    throw new Error('Environment not accepted')
  }
})();

newTracker(trackedId, collectorUrl, {
  appId: 'jobmatix-platform-pixel',
  plugins: [ LinkClickTrackingPlugin() ],
  eventMethod: 'post',
  platform: 'web',
  cookieName: cookieName,
  cookieSameSite: 'Lax',
  contexts: {
    webPage: !0,
    performanceTiming: !0,
  },
})

window.jobmatix = (functionName, ...rest) => {
  try {
    const trackFunction = trackFunctions[functionName]
    trackFunction(...rest)
  } catch(e) {
    console.error(`Function ${functionName} not found`)
  }
}

functionsQueue.forEach((args) => {
  jobmatix(...args)
})

function runDefaultAction(...as) {
  const inQueue = functionsQueue.some((args) => args[0] === as[0])
  if (!inQueue) {
    jobmatix(...as)
  }
}

runDefaultAction('enableActivityTracking', { minimumVisitLength: 10, heartbeatDelay: 10 })
runDefaultAction('enableLinkClickTracking')
runDefaultAction('setReferrerUrl', document.referrer)
runDefaultAction('trackPageView', {
  context: [{
    schema: 'iglu:com.jobmatix/jobmatix_platform_pixel/jsonschema/1-0-0',
    params: appParams,
  }],
})

function jobmatixConversion(params) {
  try {
    if (!params?.type) {
      throw new Error('Conversion type not found')
    }
    if (!acceptedConversionTypes.includes(params.type)) {
      throw new Error('Conversion type not accepted')
    }
    const data = {}
    Object.keys(params).forEach((key) => {
      const dataKey = conversionKeys[key] || key
      if (params[key]) {
        data[dataKey] = String(params[key])
      }
    })
    trackSelfDescribingEvent({
      event: {
        schema: 'iglu:com.jobmatix/conversion/jsonschema/1-0-0',
        data,
      },
    })
  } catch(error) {
    console.error(error)
  }
}
