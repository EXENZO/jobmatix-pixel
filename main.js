import {
  enableActivityTracking,
  newTracker,
  setReferrerUrl,
  trackPageView,
  trackSelfDescribingEvent,
} from '@snowplow/browser-tracker'
import { LinkClickTrackingPlugin, enableLinkClickTracking } from '@snowplow/browser-plugin-link-click-tracking';

export function getAppId() {
  const widgetScript = document.querySelector(`script[src="${sourceLink}"]`)
  return widgetScript?.getAttribute('id')
}

const sourceLink = '/tracking/jobmatix.js'
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

enableActivityTracking({ minimumVisitLength: 10, heartbeatDelay: 10 })
enableLinkClickTracking()
setReferrerUrl(document.referrer)
trackPageView()

const jobmatixTrackSelfDescribingEvent = (data) => trackSelfDescribingEvent({
  event: {
    schema: 'iglu:com.jobmatix/conversion/jsonschema/1-0-0',
    data: {
      conversion_type: 'applicant',
      ...data
    }
  }
})
