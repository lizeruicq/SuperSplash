System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, PrerollAdEvent, InterstitialAdEvent, RewardedVideoAdEvent;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "b8d97AYFkhPf7LHlB3L3ioX", "ad_event", undefined);

      /**
       * Ad Events for Interstitial Callback
       */
      _export("PrerollAdEvent", PrerollAdEvent = /*#__PURE__*/function (PrerollAdEvent) {
        PrerollAdEvent["AD_BREAK_DONE"] = "H5GA_EVENT_PREROLL_AD_BREAK_DONE";
        return PrerollAdEvent;
      }({}));
      /**
       * Ad Events for Interstitial Callback
       */


      _export("InterstitialAdEvent", InterstitialAdEvent = /*#__PURE__*/function (InterstitialAdEvent) {
        InterstitialAdEvent["BEFORE_AD"] = "H5GA_EVENT_INTERSTITIAL_BEFORE_AD";
        InterstitialAdEvent["AFTER_AD"] = "H5GA_EVENT_INTERSTITIAL_AFTER_AD";
        InterstitialAdEvent["AD_BREAK_DONE"] = "H5GA_EVENT_INTERSTITIAL_AD_BREAK_DONE";
        return InterstitialAdEvent;
      }({}));
      /**
       * Ad Events for Rewarded Video Callback
       */


      _export("RewardedVideoAdEvent", RewardedVideoAdEvent = /*#__PURE__*/function (RewardedVideoAdEvent) {
        RewardedVideoAdEvent["BEFORE_AD"] = "H5GA_EVENT_REWARDED_VIDEO_BEFORE_AD";
        RewardedVideoAdEvent["AFTER_AD"] = "H5GA_EVENT_REWARDED_VIDEO_AFTER_AD";
        RewardedVideoAdEvent["AD_BREAK_DONE"] = "H5GA_EVENT_REWARDED_VIDEO_AD_BREAK_DONE";
        RewardedVideoAdEvent["BEFORE_REWARD"] = "H5GA_EVENT_REWARDED_VIDEO_BEFORE_REWARD";
        RewardedVideoAdEvent["AD_DISMISSED"] = "H5GA_EVENT_REWARDED_VIDEO_AD_DISMISSED";
        RewardedVideoAdEvent["AD_VIEWED"] = "H5GA_EVENT_REWARDED_VIDEO_AD_VIEWED";
        return RewardedVideoAdEvent;
      }({}));

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=88ac7a162973380edd5431d80072fce16cd402cc.js.map