# Configuración de Webhooks en Mercado Pago y PayPal

Este documento te guiará a través de los pasos para configurar webhooks en Mercado Pago y PayPal, dos plataformas populares de pago en línea.

## Configuración en Mercado Pago

### Paso 1: Crear un Webhook en Mercado Pago

1. **Iniciar sesión en tu cuenta de Mercado Pago**:
   - Dirígete al sitio web oficial de [Mercado Pago](https://www.mercadopago.com) e inicia sesión con tus credenciales.

2. **Ir a la sección de Webhooks**:
   - En el panel de administración de Mercado Pago, busca la sección de configuración o integraciones y selecciona "Webhooks".

3. **Agregar un nuevo Webhook**:
   - Haz clic en "Agregar Webhook".
   - Ingresa la URL de tu servidor donde Mercado Pago enviará las notificaciones.
   - Selecciona los eventos yo use pagos

4. **Guardar y verificar**:
   - Guarda la configuración del webhook.
   - Verifica que el webhook esté configurado correctamente realizando pruebas de pago y asegurándote de que tu servidor reciba las notificaciones.


## Configuración en PayPal

### Paso 1: Crear un Webhook en PayPal

1. **Iniciar sesión en tu cuenta de PayPal**:
   - Accede al sitio web oficial de [PayPal Developer](https://developer.paypal.com) con tu cuenta de desarrollador.

2. **Ir al Centro de Notificaciones**:
   - Navega al "Centro de Notificaciones" en la sección de herramientas de desarrollo.

3. **Crear un Nuevo Webhook**:
   - Haz clic en "Crear webhook".
   - Proporciona una URL para tu servidor donde PayPal enviará las notificaciones.
   - Selecciona los eventos específicos que deseas recibir  yo use todo de checkout

4. **Guardar y verificar**:
   - Guarda la configuración del webhook.
   - Verifica que el webhook esté configurado correctamente realizando pruebas de pago y asegurándote de que tu servidor reciba las notificaciones.


