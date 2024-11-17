<?php 
headerTienda($data);
//$banner = media()."/tienda/images/bg-01.jpg";
 $banner = $data['page']['portada'];
 $idpagina = $data['page']['idpost'];
 ?>
 <script>
 	document.querySelector('header').classList.add('header-v4');
 </script>
<!-- Content page -->
<?php
	if(viewPage($idpagina)){
	?>
<section class="bg0 p-t-75 p-b-120">
    <div class="container">
        <div class="row p-b-148">
            <div class="col-md-7 col-lg-8">
                <div class="p-t-7 p-r-85 p-r-15-lg p-r-0-md">
                    <h3 class="mtext-111 cl2 p-b-16">Historia</h3>
                    <p class="stext-113 cl6 p-b-26">
						Wire Lynx se fundó en el año 2022, en Sonsonate, El Salvador, donde tres desarrolladores de la Universidad de Sonsonate emprendieron un proyecto de Sistemas de Comercio Electrónico. Lo que empezó como proyectos colaborativos entre clases se convirtió en una idea más ambiciosa: crear una tienda online que no solo destacara por su tecnología avanzada, sino también por su compromiso con la comunidad local y así se lanzó una plataforma de comercio electrónico. Wire Lynx se destaca por ofrecer productos de calidad, entregas rápidas y un servicio al cliente excepcional, llevando la modernidad y comodidad del e-commerce a todos los rincones de El Salvador. Se integraron tecnologías avanzadas en la plataforma, desde opciones de pago seguras hasta un catálogo muy sólido con apoyo de las mejores marcas.
                    </p>
                </div>
            </div>
            <div class="col-11 col-md-5 col-lg-4 m-lr-auto">
                <div class="how-bor1">
                    <div class="hov-img0">
                        <img src="https://cdn.prod.website-files.com/6384aadeeb9aef4298860dd3/6466fc4234a7324e51fd3491_annie-spratt-QckxruozjRg-unsplash.jpeg" alt="IMG" width="500" height="333">
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="order-md-2 col-md-7 col-lg-8 p-b-30">
                <div class="p-t-7 p-l-85 p-l-15-lg p-l-0-md">
                    <h2 class="mtext-111 cl2 p-b-16"><span style="color: #236fa1;">Nuestra Misión</span></h2>
                    <p class="stext-113 cl6 p-b-26">
						Nuestra misión es ofrecer una experiencia de compra en línea accesible, rápida y confiable, con productos de calidad que satisfacen las necesidades de nuestros clientes en El Salvador y más allá. A través de tecnología innovadora y un servicio al cliente excepcional, buscamos mejorar la vida de nuestros usuarios, apoyando el desarrollo local y facilitando el acceso a una amplia gama de productos a tan solo un clic de distancia.
                    </p>
                    <h2 class="mtext-111 cl2 p-b-16"><span style="color: #236fa1;">Nuestra Visión</span></h2>
                    <p class="stext-113 cl6 p-b-26">
						Ser la tienda en línea líder en El Salvador, reconocida por su innovación, servicio personalizado y compromiso con la comunidad. Nos proponemos ser un referente en el comercio electrónico a nivel regional, manteniéndonos a la vanguardia de la tecnología y contribuyendo al crecimiento económico de nuestro país, todo mientras brindamos a nuestros clientes una experiencia de compra superior.
                    </p>
                </div>
            </div>
            <div class="order-md-1 col-11 col-md-5 col-lg-4 m-lr-auto p-b-30">
                <div class="how-bor2">
                    <div class="hov-img0">
                        <img src="https://retail-merchandiser.com/wp-content/uploads/sites/8/2024/02/Pick-up-and-delivery-services-image.jpeg" alt="IMG" width="500" height="333">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<?php
	}else{
  ?>
<div>
	<div class="container-fluid py-5 text-center" >
		<img src="<?= media() ?>/images/construction.png" alt="En construcción">
		<h3>Estamos trabajando para usted.</h3>
	</div>
</div>
<?php 
	}

	footerTienda($data);
?>