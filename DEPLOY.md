# Publicación de la landing

La rama `main` es producción; `staging` se prueba en la instalación local de Dokploy. La landing se exporta a `out/` y se sirve desde el Worker `axtroos-landing`. El centro de ayuda es un Worker independiente.

En Workers Builds, conectar `Xerebrum-Sites/chato`, seleccionar `main` como rama de producción y desactivar builds de otras ramas. Usar Node 22, `npm ci && npm run build` como comando de build y `npx --yes wrangler@4.151.3 deploy` como comando de deploy. Las variables `NEXT_PUBLIC_*` se incorporan durante el build; verificar las URLs de producción antes de publicar.

La configuración no modifica dominios: validar primero el Worker en su URL temporal y trasladar los hostnames de la landing por separado, manteniendo disponible el origen anterior para rollback. No tocar el dominio ni el Worker del centro de ayuda. Las respuestas de la URL temporal llevan `X-Robots-Tag: noindex`.

Para probar localmente: `npm ci && npm run build`, seguido de `npx --yes wrangler@4.151.3 dev`. Para desarrollo habitual, `npm run dev`. Las APIs usadas por la landing deben apuntar al entorno adecuado y permitir el origen correspondiente.
