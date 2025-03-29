import InfoHelp from '../components/InfoHelp/InfoHelp'

export default function Help() {
    return (
        <div className='container'>
            <h1>Ayuda</h1>

            <InfoHelp>
                <>
                    <h3>¿Como agregar productos al carrito?</h3>
                    <p>Para agregar productos al carrito, podemos hacerlo de varias formas.</p>
                    <div className='center-div my-1'>
                        <img src="/add-cart.png" alt="Add products to cart" className='max-w-image' />
                    </div>
                    <p className='text-justify'>Tenemos dos de las alternativas, si el producto <span className='text-success font-bold'>NO TIENE TALLAS</span> apareceran dos componentes, uno donde podrá seleccionar la cantidad que busca agregar al carrito y un botón para "Agregar al carrito", cuando se da click, el producto se guardara en el carrito, y aparecerá una alerta en la parte superior de la pantalla. De lo contrario si el producto <span className='text-danger font-bold'>TIENE TALLAS</span> aparecerá un botón "Agregar al carrito", que al momento de hacer click será enviado a la sección del carrito, donde será dirigido a la pantalla con la información del producto como esta:</p>
                    <div className='center-div my-1'>
                        <img src="/product-section.png" alt="Add products to cart" className='max-w-image' />
                    </div>
                    <p className='text-justify'>En esta página debe seleccionar la talla que busca comprar, la cantidad de productos que se busca agregar al carrito, y se da click al botón "Agregar al carrito" y aparecerá una alerta en la parte inferior de la pantalla notificando que el producto se ha agregado y se actualizara el número de productos en el botón de carrito en la barra de navegación.</p>
                </>
            </InfoHelp>

            <InfoHelp>
                <>
                    <h3>¿Como comprar?</h3>
                    <p className='text-justify'>Para poder finalizar una compra, primero se deben tener al menos un producto en el carrito, de lo contrario, no sé podrá continuar con la compra.</p>
                    <div className='center-div my-1'>
                        <img src="/cart.png" alt="Cart" className='max-w-image' />
                    </div>
                    <p className='text-justify'>Una vez el carrito tenga al menos un producto, nos dirigiremos a la sección del carrito, donde se mostrará un resumen de los productos a comprar, y a la derecha el subtotal que es la suma de todos los productos, la cantidad de productos, y el botón con la leyenda "Continuar", al darle click nos llevarpá a la sección "Checkout".</p>
                    <div className='center-div my-1'>
                        <img src="/checkout.png" alt="Add products to cart" className='max-w-image' />
                    </div>
                    <p className='text-justify'>Para finalizar la compra debe completar el apartado de <span className='font-bold'>Dirección</span> para que se habilite el apartado de Finalizar compra, ahi debe seleccionar el método de pago que sería <span className='font-bold'>Paypal</span> ó <span className='font-bold'>Tarjeta de crédito o débito</span>, para el pago con Paypal, debe ingresar con su cuenta de PayPal y darle click en el botón de "Compra completa".</p>
                    <div className='center-div my-1'>
                        <img src="/paypal-checkout.png" alt="Add products to cart" className='max-w-image' />
                    </div>
                    <p className='text-justify'>En el caso de la tarjeta, se debe completar el formulario que se va a desplegar, se le solicitaran la información de la tarjeta y la dirección de facturación.</p>
                    <div className='center-div my-1'>
                        <img src="/card-checkout.png" alt="Add products to cart" className='max-w-image' />
                    </div>
                </>
            </InfoHelp>
        </div>
    )
}
