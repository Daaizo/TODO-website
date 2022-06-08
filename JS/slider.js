
 $(document).on('ready', function() {
	
 
    $('.single-item').slick({
      infinite: true,
      autoplay: false,
      autoplaySpeed: 1500,
      speed: 600,
      slidesToShow: 3,
      slidesToScroll: 3,
      pauseOnHover: true,
      draggable: true,
      dots: true,
      prevArrow: true,
      nextArrow: true,
      
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
            vertical: false,
            
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
          }
        },
        {
          breakpoint: 350,
          settings:  "unslick",
          
        }
      ]
    });
    // odświeżanie na zmienianiu rozdzielczości okna zatrzymuje slider w miejscu
    $(window).resize(function(){
      $('.single-item')[0].slick.refresh();
    });

});
