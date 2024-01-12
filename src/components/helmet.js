import React from 'react';
import { Helmet } from 'react-helmet-async';

export const HelmetCSP = () => {
    const csp = `
        default-src 'self' blob:;
        script-src 'unsafe-eval' 'unsafe-inline' 'self' https://fsl-admin.auth.us-east-1.amazoncognito.com https://d3oia8etllorh5.cloudfront.net http://ssl.p.jwpcdn.com https://fsl.auth.us-east-1.amazoncognito.com blob:;
        script-src-elem 'unsafe-eval' 'unsafe-inline' 'self' http://www.gstatic.com https://www.gstatic.com http://ssl.p.jwpcdn.com https://cdn.jwplayer.com https://pagead2.googlesyndication.com https://www.googletagmanager.com http://localhost:19040 https://*.audioeye.com;
        style-src 'self' 'unsafe-inline' https://wsv3cdn.audioeye.com;
        img-src 'self' https://www.googletagmanager.com https://assets-jpcust.jwpsrv.com http://prd.jwpltx.com https://cdn.jwplayer.com https://res.cloudinary.com https://*.audioeye.com;
        font-src 'self' data: maxcdn.bootstrapcdn.com https://fonts.gstatic.com https://*.audioeye.com;
        connect-src 'self' https://q8oq2mabz4.execute-api.us-east-1.amazonaws.com wss://edge.ivschat.us-east-1.amazonaws.com https://q8oq2mabz4.execute-api.us-east-1.amazonaws.com http://localhost:33555 https://analytics.google.com https://videos-cloudfront-usp.jwpsrv.com https://assets-jpcust.jwpsrv.com http://ssl.p.jwpcdn.com https://cdn.jwplayer.com https://pagead2.googlesyndication.com https://5m0z73qvpe.execute-api.us-east-1.amazonaws.com http://localhost:19040 http://localhost:8090 https://*.audioeye.com;
        media-src 'self' blob: http://ssl.p.jwpcdn.com https://cdn.jwplayer.com https://*.audioeye.com;
        object-src 'none';
        frame-src https://*.audioeye.com;
        base-uri 'self';
        form-action 'self';
        manifest-src 'self';
        worker-src 'self' blob:;
    `;

    return (
        <Helmet>
            <meta http-equiv="Content-Security-Policy" content={csp} />
            <meta property="og:site_name" content="FightSync" />
            <meta property="og:title" content="FightSync" />
            <meta http-equiv="og:description" content="FightSync is a platform for scoring fights in real-time." />
            <meta http-equiv="X-Content-Type-Options" content="nosniff" />
            <meta http-equiv="strict-transport-security" content="max-age=31536000; includeSubDomains; preload" />
        </Helmet>
    );
};

