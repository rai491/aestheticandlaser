<html><head></head><body>(function () {
  var request = new XMLHttpRequest();
  var head_elements = document.getElementsByTagName( 'head' );
  var body_elements = document.getElementsByTagName( 'body' );
  var reviews_container = document.getElementById( 'quick-feedback-reviews-widget' );
  reviews_container.style.position = 'relative';
  reviews_container.style.textAlign = 'left';

  var origin_url = window.document.location.origin;
  var iframe = document.createElement( 'iframe' );
  iframe.src = `https://quick-feedback.co/reviews-widget/6116cd60aa73770f9db9d543?origin_url=${ origin_url }`;
  iframe.frameBorder = 0;
  iframe.style.height = '100%';
  // Need absolute positioning to have width 100% working
  iframe.style.position = 'absolute';
  iframe.style.width = '100%';
  reviews_container.appendChild( iframe );

  // Only set the height of the parent container only when review container height is 100%
  if( reviews_container.style.height === "100%" &amp;&amp; ! reviews_container.parentElement.style.height ) {
    reviews_container.parentElement.style.height = "630px";
  }

  request.open( 'GET', 'https://quick-feedback.co/reviews-widget/merchants/6116cd60aa73770f9db9d543.json', true );
  request.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
  request.setRequestHeader( 'Content-Type', 'application/json' );

  function getPropHtml( object, property ) {
    return '<span itemprop="' + property + '">' + object[ property ] + '</span>';
  }

  request.onreadystatechange = function() {
    if( request.readyState === 4 &amp;&amp; request.status === 200 ) {
      // add json ld to head
      var script = document.createElement( 'script' );
      script.type = 'application/ld+json';
      script.innerText = request.response;

      if( head_elements.length ) {
        head_elements[ 0 ].appendChild( script );
      }
    }
  };

  window.addEventListener( "message", ( event ) =&gt; {
    if( event.origin.indexOf( "quick-feedback.co" ) === -1 || ! event.data?.event_name ) {
      return
    }

    if( typeof gtag !== "undefined" ) {
      gtag( "event", event.data.event_name, { name: event.data.event_name } );
    }
  }, false );

  request.send();
})(this);
</body></html>