import SegmentPlugin, { scrollToSegment } from "./videojs.segments";

var player = videojs(
  'my-video',
  {
      controls: true,
      fluid: true,
      html5: {
          vhs: { 
              overrideNative: true 
          }
      }
  },
  function() {
      var player = this;
      player.eme();
      player.src({
          src: 'https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd',
          type: 'application/dash+xml',                    
          keySystems: {
            'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/no_auth',                     
          }
      });

      player.ready(function() {
          player.tech(true).on('keystatuschange', function(event) {    
              console.log("event: ", event);      
          });
      });
  }            
);

// test data - sorted
let segments = [
  {
    start: 0,
    end: 10.0,
    label: 'First Segment'
  },
  {
    start: 10.0,
    end: 25.0,
    label: 'Second Segment'
  },
  {
    start: 25.0,
    end: 100,
    label: 'dsfd'
  }
];

SegmentPlugin(player, 'my-video', segments);

