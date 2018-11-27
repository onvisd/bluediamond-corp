import React from 'react';
import webpageServer from 'react-isomorphic-render/server';
import {devtools} from 'universal-webpack';

import settings, {icon} from '../src/react-isomorphic-render';
import config from '../../config';

export default function(parameters) {
    // Starts webpage rendering server
    const server = webpageServer(settings, {
        // HTTP host and port for performing all AJAX requests
        // when rendering pages on server-side.
        // E.g. an AJAX request to `/items/5` will be transformed to
        // `http://${host}:${port}/items/5` during server-side rendering.
        // Specify `secure: true` flag to use `https` protocol instead of `http`.
        application: config.services.rendering.ajax,

        // Http Urls to javascripts and (optionally) CSS styles
        // which will be insterted into the <head/> element of the resulting Html webpage
        // (as <script src="..."/> and <link rel="style" href="..."/> respectively)
        //
        // Also a website "favicon".
        //
        assets() {
            // Retrieve asset chunk file names
            // (which are output by client side Webpack build)
            const result = {...parameters.chunks()};

            // Webpack entry point (can be used for code splitting)
            result.entries = ['manifest', 'react-lib', 'main'];

            // // Clear Webpack require() cache for hot reload in development mode
            // // (this is not necessary)
            // if (process.env.NODE_ENV !== 'production') {
            //     delete require.cache[require.resolve('../assets/images/icon.png')]
            // }

            // Add "favicon"
            result.icon = icon;

            // Return assets
            return result;
        },

        html: {
            // Will be inserted into server rendered webpage <head/>
            // (this `head()` function is optional and is not required)
            // (its gonna work with or without this `head()` parameter)
            head(path, {store}) {
                let output = [];

                if(process.env.NODE_ENV === 'development') {
                    // `devtools` just tampers with CSS styles a bit.
                    // It's not required for operation and can be omitted.
                    // It just removes the "flash of unstyled content" in development mode.
                    output.push(
                        <script dangerouslySetInnerHTML={{__html:
                            devtools({...parameters, entry: 'main'})
                        }} />
                    );
                }
                
                // FB SDK
                output.push(
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                  window.fbAsyncInit = function() {
                    FB.init({
                      appId            : '2185001408409392',
                      autoLogAppEvents : true,
                      xfbml            : true,
                      version          : 'v3.2'
                    });
                  };

                  (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "https://connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                  }(document, 'script', 'facebook-jssdk'));
                   `
                        }}
                    />
                );

                // For Pingdom RUM
                output.push(
                    <script dangerouslySetInnerHTML={{__html: `
                        var _prum = [['id', '59c5525f8d4ea3c8367b23c6'],
                                     ['mark', 'firstbyte', (new Date()).getTime()]];
                        (function() {
                            var s = document.getElementsByTagName('script')[0]
                              , p = document.createElement('script');
                            p.async = 'async';
                            p.src = '//rum-static.pingdom.net/prum.min.js';
                            s.parentNode.insertBefore(p, s);
                        })();
                    `}} />
                );

                // For GTM
                if(process.env.NODE_ENV !== 'development') {
                    output.push(
                        <script dangerouslySetInnerHTML={{__html: `
                            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});
                            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),
                            dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;
                            f.parentNode.insertBefore(j,f);})(
                                window,document,'script','dataLayer','GTM-PLGLCKN'
                            );
                        `}} />
                    );
                }

                // Head tags provided by the state
                const {head} = store.getState();
                if(head.tags.length)
                    output = output.concat(head.tags);

                return output;
            },

            // Isomorphic CSS flag
            bodyStart() {
                return `
                    <script>
                        // This line is just for CSS
                        document.body.classList.add('javascript-is-enabled');
                    </script>
                `;
            }
        },

        localize: () => ({
            locale: 'en',
            messages: {}
        })
    });

    // Start webpage rendering server
    server.listen(config.services.rendering.port, function(error) {
        if(error) {
            console.error('Webpage rendering service was shut down due to an error');
            throw error;
        }

        console.log(`Running in ${process.env.NODE_ENV} mode`);
        console.log(
            `Render service is listening at port ${config.services.rendering.port}`
        );
    });
}
