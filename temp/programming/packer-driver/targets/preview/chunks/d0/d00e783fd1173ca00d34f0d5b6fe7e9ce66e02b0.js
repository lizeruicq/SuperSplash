System.register(["cc", "__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, game, InterstitialAdEvent, PrerollAdEvent, RewardedVideoAdEvent, ADS_BY_GOOGLE, adBreak, showRewardedAdFn;

  /**
   * API to show Preroll Ad when available.
   * If there are no ad available this function will request an ad.
   */
  function showPrerollAd() {
    try {
      var game_instance = game;
      adBreak({
        type: 'preroll',
        adBreakDone: placementInfo => {
          game_instance.emit(PrerollAdEvent.AD_BREAK_DONE);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * API to show Interstitial Ad when available.
   * If there are no ad available this function will request an ad.
   */


  function showInterstitialAd(type, name) {
    try {
      var gameInstance = game;
      adBreak({
        type,
        name,
        beforeAd: () => {
          gameInstance.emit(InterstitialAdEvent.BEFORE_AD);
        },
        afterAd: () => {
          gameInstance.emit(InterstitialAdEvent.AFTER_AD);
        },
        adBreakDone: placementInfo => {
          gameInstance.emit(InterstitialAdEvent.AD_BREAK_DONE);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * API to request Rewarded Ad.
   * To show the Rewarded Ad you could call showRewardedAd after
   * beforeReward callback.
   */


  function requestRewardedAd(name) {
    try {
      var gameInstance = game;
      adBreak({
        type: 'reward',
        name,
        beforeAd: () => {
          gameInstance.emit(RewardedVideoAdEvent.BEFORE_AD);
        },
        afterAd: () => {
          gameInstance.emit(RewardedVideoAdEvent.AFTER_AD);
        },
        adBreakDone: placementInfo => {
          gameInstance.emit(RewardedVideoAdEvent.AD_BREAK_DONE);
        },
        beforeReward: showAdFn => {
          showRewardedAdFn = showAdFn;
          gameInstance.emit(RewardedVideoAdEvent.BEFORE_REWARD);
        },
        adDismissed: () => {
          gameInstance.emit(RewardedVideoAdEvent.AD_DISMISSED);
        },
        adViewed: () => {
          gameInstance.emit(RewardedVideoAdEvent.AD_VIEWED);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * API to show Rewarded Ad when available.
   */


  function showRewardedAd() {
    if (!showRewardedAdFn) {
      console.log('No Rewarded Ad available');
      return;
    }

    showRewardedAdFn();
    showRewardedAdFn = null;
  }

  _export({
    showPrerollAd: showPrerollAd,
    showInterstitialAd: showInterstitialAd,
    requestRewardedAd: requestRewardedAd,
    showRewardedAd: showRewardedAd
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      game = _cc.game;
    }, function (_unresolved_) {
      InterstitialAdEvent = _unresolved_.InterstitialAdEvent;
      PrerollAdEvent = _unresolved_.PrerollAdEvent;
      RewardedVideoAdEvent = _unresolved_.RewardedVideoAdEvent;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "b502agl98JO5LdeYFUo8lUV", "h5_games_ads", undefined);

      __checkObsolete__(['game']);

      // This is needed since there're no definition for AdSense object here.
      // tslint:disable-next-line:no-any
      ADS_BY_GOOGLE = window.adsbygoogle;

      adBreak = o => {
        ADS_BY_GOOGLE.push(o);
      };

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=d00e783fd1173ca00d34f0d5b6fe7e9ce66e02b0.js.map