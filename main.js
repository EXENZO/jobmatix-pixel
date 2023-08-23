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
}

export function getAppId() {
  const widgetScript = document.querySelector(`script[src="${sourceLink}"]`)
  return widgetScript?.getAttribute('id')
}

const sourceLink = 'https://unpkg.com/@jobmatix.com/pixel/script.min.js'
const collectorUrl = 'https://pixel.jobmatix.app'
const appId = getAppId()

if (!appId) {
  throw new Error('App ID not found')
}

newTracker('sp', collectorUrl, {
  appId,
  plugins: [ LinkClickTrackingPlugin() ],
  eventMethod: 'post',
  platform: 'web',
  cookieName: '_sp_',
  cookieSameSite: 'Lax',
  contexts: {
    webPage: !0,
    performanceTiming: !0,
  },
})

const q = window.jobmatix.q || []

window.jobmatix = (...args) => {
  const [ functionName, ...rest ] = args
  const trackFunction = trackFunctions[functionName]
  if (trackFunction) {
    trackFunction(...rest)
  } else {
    console.error(`Function ${functionName} not found`)
  }
}

q.forEach((args) => {
  window.jobmatix(...args)
})
