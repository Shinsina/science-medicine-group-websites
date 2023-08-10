import MonoRail from '@parameter1/base-cms-marko-web-theme-monorail/browser';
import Auth0 from '@science-medicine-group/package-auth0/browser';
import Braze from '@science-medicine-group/package-braze/browser';
import FormLogin from './form-login.vue';
import Rudderstack from './rudderstack.vue';
import Auth0Authenticated from './auth0-authenticated.vue';
import CollapsibleSidebar from './collapsible-sidebar.vue';

const GlobalNewsletterMenu = () => import(/* webpackChunkName: "global-newsletter-menu" */ './newsletter-menu.vue');
const ContentMeterTrack = () => import(/* webpackChunkName: "content-meter-tracker" */ './track-content-meter.vue');
const GlobalRevealAdHandler = () => import(/* webpackChunkName: "reveal-ad-handler" */ './reveal-ad-handler.vue');

export default (Browser, siteSpecificCustomComponents = {}) => {
  const { EventBus } = Browser;
  MonoRail(Browser, {
    enableOmedaIdentityX: false,
    idxArgs: {
      CustomLoginComponent: FormLogin,
      ...siteSpecificCustomComponents,
    },
  });
  Browser.register('Auth0Authenticated', Auth0Authenticated, {
    provide: { EventBus },
  });
  Browser.register('ContentMeterTrack', ContentMeterTrack);
  Browser.register('GlobalNewsletterMenu', GlobalNewsletterMenu, {
    provide: { EventBus },
  });
  Auth0(Browser);
  Braze(Browser);
  Browser.register('CollapsibleSidebar', CollapsibleSidebar);

  // Rudderstack identification
  Browser.register('Rudderstack', Rudderstack, { provide: { EventBus } });

  Browser.register('GlobalRevealAdHandler', GlobalRevealAdHandler);

  EventBus.$on('identity-x-change-email-link-sent', () => {
    // "reload" the page to update user state
    window.location.search = 'sent=true';
  });
};
