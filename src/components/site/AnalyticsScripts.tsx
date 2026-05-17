import Script from "next/script";
import { sanitizeGoogleAnalyticsId, sanitizeYandexMetrikaId } from "@/lib/analytics";

type Props = {
  googleAnalyticsId: string | null;
  yandexMetrikaId: string | null;
};

export function AnalyticsScripts({ googleAnalyticsId, yandexMetrikaId }: Props) {
  const gaId = sanitizeGoogleAnalyticsId(googleAnalyticsId);
  const ymId = sanitizeYandexMetrikaId(yandexMetrikaId);

  if (!gaId && !ymId) return null;

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="webo-google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      ) : null}
      {ymId ? (
        <Script id="webo-yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${ymId},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
        </Script>
      ) : null}
    </>
  );
}
