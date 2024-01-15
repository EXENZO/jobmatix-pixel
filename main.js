import {
  enableActivityTracking,
  newTracker,
  setReferrerUrl,
  trackPageView,
  trackSelfDescribingEvent,
} from '@snowplow/browser-tracker'
import { LinkClickTrackingPlugin, enableLinkClickTracking } from '@snowplow/browser-plugin-link-click-tracking';

const trackFunctions = {
  enableActivityTracking,
  setReferrerUrl,
  trackPageView,
  trackSelfDescribingEvent,
  enableLinkClickTracking,
};

const appParams = window.jobmatix.p || {}
const functionsQueue = window.jobmatix.q || []
const collectorUrl = 'https://pixel.jobmatix.app'
const acceptedEnvs = ['production', 'local', 'development', 'demo', 'uat']
const sourceLinks = ['https://unpkg.com/@jobmatix.com/pixel/script.min.js', 'https://unpkg.com/@jobmatix.com/pixel/jm.min.js', './script.min.js'];

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

newTracker('jm', collectorUrl, {
  ['jobmatix-platform-pixel']: appParams.pixel_id,
  plugins: [ LinkClickTrackingPlugin() ],
  eventMethod: 'post',
  platform: 'web',
  cookieName: '_jm_',
  cookieSameSite: 'Lax',
  contexts: {
    webPage: !0,
    performanceTiming: !0,
  },
})

window.jobmatix = (...args) => {
  const [ functionName, ...rest ] = args
  try {
    const trackFunction = trackFunctions[functionName]
    trackFunction(...rest)
  } catch(e) {
    console.error(`Function ${functionName} not found`)
  }
}

functionsQueue.forEach((args) => {
  window.jobmatix(...args)
})

jobmatix('enableActivityTracking', { minimumVisitLength: 10, heartbeatDelay: 10 })
jobmatix('enableLinkClickTracking')
jobmatix('setReferrerUrl', document.referrer)
jobmatix('trackPageView', {
  context: [{
    schema: 'iglu:com.jobmatix/jobmatix_platform_pixel/jsonschema/1-0-0',
    params: appParams,
  }],
})

const acceptedConversionTypes = ['applicant', 'apply_start', 'job_alert', 'resume', 'register']
const conversionKeys = {
  type: 'conversion_type',
}

window.jobmatix.conversion = (params) => {
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
    jobmatix('trackSelfDescribingEvent', {
      event: {
        schema: 'iglu:com.jobmatix/conversion/jsonschema/1-0-0',
        data,
      },
    })
  } catch(error) {
    console.error(error)
  }
}
