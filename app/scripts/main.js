(function ($){

  function init() {
    var t = $('#cm'),
      n = t.find('.overlay'),
      r,
      a = {
      init: function() {
        $(window).on('resize', this.onResize).trigger('resize'),
          t.css({
            backgroundSize: t.width() + 'px ' + t.height() + 'px',
          }),
          t.on('mousemove', a.onMouseMove);
      },
      onResize: function() {
        var i = 76; //Math.max($(window).width(), $(window).height());
        t.css({
          backgroundSize: t.width() + 'px ' + t.height() + 'px',
        }),
        r = 76,
          n.css({
            width: r + 'px',
            height: r + 'px'
          })
      },
      onMouseMove: function(e) {
        var s = a.calculateBackgroundPosition(e)
          , o = e.pageX / $(window).width();

        n.css({
          top: e.pageY - (r/2),
          left: e.pageX - (r/2),
          backgroundSize: t.width() + 'px ' + t.height() + 'px',
          backgroundPosition: s.left + 'px ' + s.top + 'px'
        }),
          o < .01 || o > .99 ? (n.css('opacity', 0),
            t.css('cursor', 'default')) : (n.css('opacity', '1'),
            t.css('cursor', 'none'))
      },
      calculateBackgroundPosition: function(e) {

        var x = e.pageX,
          y = e.pageY;


          return {
            left: ((t.width() - x) + (r/2)),
            top: ((t.height() - y) + (r/2))
          };
      }
    };
    return a
  }



  function getSvgDims($elm, dim) {
    return (dim === 'width') ? $elm[0].getBBox().width : $elm[0].getBBox().height;
  }


  var $nodes = $('.node-node');
  var $cont = $('#cm');
  var counter = 0;

  $(window).on('resize', function(){
    if($(window).width() < 1220) {
      $('.cm-node').first().addClass('inverse');
    } else {
      $('.cm-node').first().removeClass('inverse');
    }
  });

  if($cont.hasClass('auto')){
    if(!$('.touch').length) {
      var h = init();
      h.init();
    }

    setInterval(function(){
      $('.active').removeClass('active');
      $nodes.each(function(idx, el){
        if(idx === counter) {
          var $curr = $(el),
            $this = $curr.parents('.cm-node'),
            $svg = $this.find('svg'),
            $g = $svg.find('g'),
            $poly = $g.find('polygon'),
            $lines = $svg.find('line'),
            cWidth = $svg.width(),
            cHeight = $svg.height(),
            gWidth = getSvgDims($g, 'width'),
            gHeight = getSvgDims($g, 'height'),
            wDiff = cWidth - gWidth,
            hDiff = cHeight - gHeight,
            endPoints = [];

              //ensure svg container is not outside on hero

              if($this.hasClass('inverse')) {
                wDiff = 0;
                hDiff = 0;
                endPoints.push(
                  {
                    x1: 5,
                    y1: 83,
                    x2: 255,
                    y2: 146
                  }
                );

                endPoints.push(
                  {
                    x1: 170,
                    y1: 83,
                    x2: 255,
                    y2: 146
                  }
                );

                endPoints.push(
                  {
                    x1: 775,
                    y1: 300,
                    x2: 255,
                    y2: 146
                  }
                );


                $lines.each(function(index, el){
                  var $elm = $(el);

                  $elm.attr('x1', (endPoints[index].x1));
                  $elm.attr('y1', (endPoints[index].y1));
                  $elm.attr('x2', (endPoints[index].x2 + wDiff));
                  $elm.attr('y2', (endPoints[index].y2 + hDiff));

                });

              } else {
                endPoints.push(
                  {
                    x2: $poly[0].getBBox().x,
                    y2: $poly[0].getBBox().y
                  }
                );

                endPoints.push(
                  {
                    x2: $poly[0].getBBox().x,
                    y2: $poly[0].getBBox().height
                  }
                );

                endPoints.push(
                  {
                    x2: $poly[0].getBBox().width,
                    y2: $poly[0].getBBox().height
                  }
                );


                $lines.each(function(index, el){
                  var $elm = $(el);

                  $elm.attr('x2', (endPoints[index].x2 + wDiff));
                  $elm.attr('y2', (endPoints[index].y2 + hDiff));

                });

              }



              $g.attr('transform', 'translate(' + wDiff +' ' + hDiff + ')');



          $this.addClass('active');
        }

      });
      counter++;

      if(counter >= $nodes.length)
        counter = 0;

    }, 3000)
  } else {
    if(!$('.touch').length){
      var h = init();
      h.init();

      $nodes.hover(function(){
        var $this = $(this).parents('.cm-node'),
          $svg = $this.find('svg'),
          $g = $svg.find('g'),
          $poly = $g.find('polygon'),
          $lines = $svg.find('line'),
          cWidth = $svg.width(),
          cHeight = $svg.height(),
          gWidth = getSvgDims($g, 'width'),
          gHeight = getSvgDims($g, 'height'),
          wDiff = cWidth - gWidth,
          hDiff = cHeight - gHeight,
          endPoints = [];

        //ensure svg container is not outside on hero

        if($this.hasClass('inverse')) {
          wDiff = 0;
          hDiff = 0;
          endPoints.push(
            {
              x1: 5,
              y1: 83,
              x2: 255,
              y2: 146
            }
          );

          endPoints.push(
            {
              x1: 170,
              y1: 83,
              x2: 255,
              y2: 146
            }
          );

          endPoints.push(
            {
              x1: 775,
              y1: 300,
              x2: 255,
              y2: 146
            }
          );


          $lines.each(function(index, el){
            var $elm = $(el);

            $elm.attr('x1', (endPoints[index].x1));
            $elm.attr('y1', (endPoints[index].y1));
            $elm.attr('x2', (endPoints[index].x2 + wDiff));
            $elm.attr('y2', (endPoints[index].y2 + hDiff));

          });

        } else {
          endPoints.push(
            {
              x2: $poly[0].getBBox().x,
              y2: $poly[0].getBBox().y
            }
          );

          endPoints.push(
            {
              x2: $poly[0].getBBox().x,
              y2: $poly[0].getBBox().height
            }
          );

          endPoints.push(
            {
              x2: $poly[0].getBBox().width,
              y2: $poly[0].getBBox().height
            }
          );


          $lines.each(function(index, el){
            var $elm = $(el);

            $elm.attr('x2', (endPoints[index].x2 + wDiff));
            $elm.attr('y2', (endPoints[index].y2 + hDiff));

          });

        }



        $g.attr('transform', 'translate(' + wDiff +' ' + hDiff + ')');



        $this.addClass('active');


        $svg.hover(function(){
          if(!$this.hasClass('active')){
            $this.addClass('active');
          }
        }, function(){
          if($this.hasClass('active')){
            $this.removeClass('active');
          }

        })

      }, function(){
        $('.active').removeClass('active');
      });
    } else {
      //MOBILE
      $nodes.on('touchstart', function(){

        if($('.active').length) {
          $('.active').removeClass('active');
        }

        var $this = $(this),
          $svg = $this.find('svg'),
          $g = $svg.find('g'),
          $poly = $g.find('polygon'),
          $lines = $svg.find('line'),
          cWidth = $svg.width(),
          cHeight = $svg.height(),
          gWidth = getSvgDims($g, 'width'),
          gHeight = getSvgDims($g, 'height'),
          wDiff = cWidth - gWidth,
          hDiff = cHeight - gHeight,
          endPoints = [];


        $this.addClass('active');


        //ensure svg container is not outside on hero
        endPoints.push(
          {
            x2: $poly[0].getBBox().x,
            y2: $poly[0].getBBox().y
          }
        );

        endPoints.push(
          {
            x2: $poly[0].getBBox().x,
            y2: $poly[0].getBBox().height
          }
        );

        endPoints.push(
          {
            x2: $poly[0].getBBox().width,
            y2: $poly[0].getBBox().height
          }
        );

        $lines.each(function(index, el){
          var $elm = $(el);

          $elm.attr('x2', (endPoints[index].x2 + wDiff));
          $elm.attr('y2', (endPoints[index].y2 + hDiff));

        });


        $g.attr('transform', 'translate(' + wDiff +' ' + hDiff + ')');

      });

      $('body').on('touchstart', function(e){
        var $target = $(e.target);

        // parent is active, do nothing
        if($target.parents('.active').length) {

        } else {
          $('.active').removeClass('active');
        }

      });
    }
  }

})(jQuery);
