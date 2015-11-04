define(['UIView','UIScroll'], function (UIView, UIScroll) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      this.ENUM = {
        DIR: {
          LEFT: "LEFT",
          RIGHT: "RIGHT"
        }
      },
        this.images = [],
        this.autoPlay = !0,
        this.index = 0,
        this.delay = 3e3,
        this.dir = this.ENUM.DIR.LEFT,
        this.errorImage = "",
        this.lodingImage = "",
        this.onChange,
        this.onImageClick,
        this.container,
        this.onChanged,
        this.scope,
        this.showNav = !0,
        this.showTitle = !0,
        this.autoHeight = !1,
        this.defaultImageUrl,
        this.defaultHeight,
        this.imageSize,
        this.loop = !1,
        this.errorImageUrl = "images/news/3.png",
        this.loadImageUrl = "images/news/3.png",
        this._loadingNode,
        this._errorNode,
        this._isloadingImage = !1,
        this._pfix = "slider",
        this._changing = !1,
        this._containerNode,
        this._rootNode,
        this._imageNode,
        this._navNode,
        this._titleNode,
        this._imageLoaderNode,
        this._handerStartPos = {
          x: 0,
          y: 0
        },
        this._moveValue = 50,
        this._imageCount = 0,
        this._played = !1,
        this._size = {
          height: 0,
          width: 0
        },
        this._lastSize = {
          height: 0,
          width: 0
        },
        this._displayImage,
        this._nextImage,
        this._loadingImage = new Image,
        this._changeCompletedEvents = [],
        this._autoPlayTimeout,
        this._loadMsg = "loading...",
        this.firstLoad = !0,
        this._defaultSize = {
          width: 0,
          height: 0
        },
        this._loadingImage = new Image,
        this._errorImage = new Image

    },

    initialize: function ($super, opts) {
      $super(opts);
      var a = opts;
      for (var b in a) switch (b) {
      case "images":
      case "autoPlay":
      case "delay":
      case "dir":
      case "index":
      case "onChange":
      case "onImageClick":
      case "scope":
      case "onChanged":
      case "errorImageUrl":
      case "loadImageUrl":
      case "loop":
      case "showNav":
      case "showTitle":
      case "defaultImageUrl":
      case "defaultHeight":
      case "imageSize":
        this[b] = a[b];
        break;
      case "container":
        this._containerNode = "string" == typeof a[b] ? $(a[b]) : a[b],
          this[b] = a[b]
      }
      this._validArgs(),
        this._correctArgs(),
        this._imageCount = this.images.length,
        this._loadingImage.src = this.loadImageUrl,
        this._errorImage.src = this.errorImageUrl,
        this.autoHeight = this.imageSize && this.imageSize.width && this.imageSize.height ? !1 : !0
    },

    play: function() {
      this._played || (this._played = !0, this._injectHTML(), this._bindEvents()),
        this.rePlay()
    },

    stop: function() {
      this._clearAutoPlay()
    },

    rePlay: function() {
      this.autoPlay && this._autoPlay()
    },

    _autoPlay: function() {
      this._autoPlayTimeout = setTimeout($.proxy(function() {
          this._isloadingImage || this._play()
        },
        this), this.delay)
    },

    next: function() {
      this._changing || this._play()
    },

    pre: function() {
      if (!this._changing) {
        if (this.dir === this.ENUM.DIR.RIGHT) if (this.index >= this._imageCount - 1) {
          if (!this.loop) return;
          this.index = 0
        } else this.index++;
        else if (this.index <= 0) {
          if (!this.loop) return;
          this.index = this._imageCount - 1
        } else this.index--;
        this.goto(this.index)
      }
    },

    "goto": function(a) {
      this.index = a,
        this._changeImage()
    },

    _play: function() {
      this.dir === this.ENUM.DIR.RIGHT ? this._imageToRight() : this._imageToLeft()
    },

    _clearAutoPlay: function() {
      clearTimeout(this._autoPlayTimeout)
    },

    _validArgs: function() {
      if (!this.container || !this._containerNode) throw "[c.widget.imageSlider]:no container!"
    },

    _correctArgs: function() {
      this.delay <= 500 && (this.delay = 2e3)
    },

    _createHTML: function() {
      return ['<div class="cui-sliderContainer" style="width:100%;position:relative;">', '<div class="cui-imageContainer" style="width:100%;">', "</div>", '<div class="cui-navContainer" style="color:#1491c5;position:absolute;"></div>', '<div class="cui-titleContainer" style="color:#1491c5;position:absolute;height: 28px;">', "</div>"].join("")
    },

    _createNav: function() {
      for (var a = [], b = 0; b < this._imageCount; b++) {
        var c = b == this.index ? "cui-slide-nav-item-current": "";
        a.push('<span class="cui-slide-nav-item ' + c + '"></span>')
      }
      this._navNode.empty().html(a.join(" "))
    },

    _createTitle: function() {
      for (var a = [], b = 0; b < this._imageCount; b++) {
        var c = b == this.index ? "cui-slide-nav-item-current-title": "";
        a.push('<div class="cui-slide-nav-item-title ' + c + '">'+this.images[b].title+'</div>')
      }
      this._titleNode.empty().html(a.join(" "))
    },

    _injectHTML: function() {
      this._rootNode = $(this._createHTML()),
        this._containerNode.html(this._rootNode),
        this._imageNode = this._rootNode.find(".cui-imageContainer"),
        this._navNode = this._rootNode.find(".cui-navContainer"),
        this._titleNode = this._rootNode.find(".cui-titleContainer"),
        this.showNav || this._navNode.css("display", "none"),
        this.showTitle || this._titleNode.css("display", "none"),
        this._imageNode.empty(),
        this._createLoading(),
          this._imageCount > 0 ? this._createImageItem(this.index, $.proxy(function(a, b) {
          this._createNav(),
          this._createTitle(),
            this._setSize(b.height, b.width),
            this._displayImage = a,
            this._createImageContainer()
        },
        this)) : (this._createDefault(), this._loadingNode.css("display", "none"))
    },

    _onImageClick: function() {
      var a = this.images[this.index];
      return a && a.onClick ? void a.onClick.call(this.scope || this, a) : void(this.onImageClick && this.onImageClick.call(this.scope || this))
    },

    _createImageItem: function(a, b) {
      this._isloadingImage = !0,
        !a && (a = 0);
      var c = this._getImageInfo(a),
          d = new Image;
      c.src = c.src || this.defaultImageUrl,
        c.src && (d.src = c.src),
        c.alt && (d.alt = c.alt);
      var e = this;
      if(d.src == ''){
        c.orgImage = d,
        b.call(e, c, d)
      }
      d.onload = function() {
        c.orgImage = d,
          e.autoHeight || (e._defaultSize.width = d.width, e._defaultSize.height = d.height),
          e._isloadingImage = !1,
          b.call(e, c, d)
      },
      d.onerror = function() {
        c.loadError = !0,
          e._errorImage = new Image,
          e._errorImage.src = e.errorImageUrl,
          e._isloadingImage = !1,
          e._errorImage.onload = function() {
            c.orgImage = e._errorImage,
              b.call(e, c, e._errorImage)
          }
      }
    },

    _getImageInfo: function(a) { ! a && (a = 0);
      for (var b = 0,
               c = this.images.length; c > b; b++) if (a === b) return this.images[b];
      throw new Error("[c.ui.imageSlider]:image index is " + a + ",but images.length is " + c)
    },

    _bindEvents: function() {
      this._containerNode.bind("touchmove", $.proxy(this._touchmove, this)),
        this._containerNode.bind("touchstart", $.proxy(this._touchstart, this)),
        this._containerNode.bind("touchend", $.proxy(this._touchend, this)),
        $(window).on("resize", $.proxy(this._resize, this)),
        this._navNode.bind("click", $.proxy(this._switchImage, this)),
        this._imageNode.bind("click", $.proxy(this._onImageClick, this))
    },

    _switchImage: function(a) {
      var b = a.targetElement || a.srcElement,
          c = $(b).data("index"); (0 === c || c) && this.index !== +c && (this.index = c, this._changeImage())
    },

    _imageToRight: function() {
      if (this.index <= 0) {
        if (!this.loop) return;
        this.index = this._imageCount - 1
      } else this.index--;
      this._changeImage(this.ENUM.DIR.LEFT)
    },

    _imageToLeft: function() {
      if (this.index >= this._imageCount - 1) {
        if (!this.loop) return;
        this.index = 0
      } else this.index++;
      this._changeImage(this.ENUM.DIR.RIGHT)
    },

    _changeImage: function(a) {
      if (! (this._imageCount <= 1)) {
        this._clearAutoPlay(),
          this._changing = !0,
          !a && (a = this.dir);
        var b = this.images[this.index];
        b.node ? (this._nextImage = b, this._showSliderImage(a)) : (this._nextImage = {
          node: this._loadingNode,
          orgImage: this._loadingImage
        },
          this._showLoading(), this._createImageItem(this.index, $.proxy(function(b) {
            this._createImageContainer(),
              this._nextImage = b,
              this._showSliderImage(a)
          },
          this)))
      }
    },

    _showSliderImage: function(a) {
      var b = 0,
          c = 0,
          d = 0,
          e = 0;
      a === this.ENUM.DIR.LEFT ? (b = -1 * this._size.width, c = 0, d = 0, e = this._size.width) : (b = this._size.width, c = 0, d = 0, e = -1 * this._size.width),
        this._displayImage.node.css("left", c),
        this._nextImage.node.css("left", b).css("display", ""),
        this._nextImage.node.animate({
            left: d
          },
          500, "ease-out", $.proxy(function() {
              this._changing = !1,
                this._changeCompeted(),
                this.rePlay()
            },
            this)),
        this._displayImage.node.animate({
            left: e
          },
          500, "ease-out", $.proxy(function() {
              this._displayImage.node.css("display", "none").css("left", 0),
                this._displayImage = this._nextImage
            },
            this))
    },

    _touchmove: function(a) {
      if (!this._isMoved) {
        var c = _.ElPosition.getMousePosOfElement(a.targetTouches[0], a.currentTarget);
        if (!this._isMovedChecked) {
          var d = Math.abs(c.x - this._handerStartPos.x),
              e = Math.abs(c.y - this._handerStartPos.y);
          if (e > d) return void(this._isMoved = !0)
        }
        if (this._isMovedChecked = !0, a.preventDefault(), !this._changing) {
          var f = c.x - this._handerStartPos.x;
          f > 0 && f > this._moveValue ? this._imageToRight() : 0 > f && Math.abs(f) > this._moveValue && this._imageToLeft()
        }
      }
    },

    _touchstart: function(a) {
      this._isMoved = !1,
        this._isMovedChecked = !1;
      var c = _.ElPosition.getMousePosOfElement(a.targetTouches[0], a.currentTarget);
      this._handerStartPos = {
        x: c.x,
        y: c.y
      }
    },

    _touchend: function(a) {
      a.preventDefault()
    },

    _setSize: function(a, b) {
      this._rootNode.css("width", "100%");
      this._size.width = Math.ceil(this._rootNode.width()),
      this._size.height = Math.ceil(a==0?($(window).height()-90):a * (this._size.width / b)),//文字展现，默认高度为300
      this._size.height < 100 && (this._size.height = 100, this._size.width = b * (this._size.height / a)),
      this._rootNode.css("height", this._size.height),
      this._imageNode.find("div").not(".ct-ui-w-loading").css("width", this._size.width).css("height", this._size.height),
      this._imageNode.find("div").find("img").css("width", this._size.width).css("height", this._size.height),
      this.showNav && this._setNavPos();
      this.showTitle && this._setTitlePos();
      var that = this;
      if(a==0){
        _.each(this._imageNode.find(".slider-imageContainerNode"),function(value, key, list){
          if(that.scroll!=undefined&&that.scroll) that.scroll= null;
          if(!that.scroll&&$(value).find("#scroller").length!=0){
            that.scroll = new UIScroll({
              hScroll: false,
              vScrollbar: false,
              scrollOffset: 28,
              wrapper: $(value),
              scroller: $(value).find("#scroller")
            });
          }
        });
      }
    },

    _setNavPos: function() {
      var a = (this._size.width - 20 * this._imageCount) / 2,
          b = this._size.height - 40;
      this._navNode.css("left", a).css("top", b)
    },

    _setTitlePos: function() {
      this._titleNode.css("width",this._size.width).css("bottom", 0)
    },

    _resize: function() {
      this._lastSize.width = this._size.width,
        this._lastSize.height = this._size.height,
          this.imageSize && this.imageSize.height && this.imageSize.width ? this._setSize(this.imageSize.height, this.imageSize.width) : this._displayImage && !this._displayImage.loadError && this._setSize(this._displayImage.orgImage.height, this._displayImage.orgImage.width)
    },

    _changeCompeted: function() {
      for (var a in this._changeCompletedEvents) this._changeCompletedEvents[a]();
      this._changeCompletedEvents.length = 0,
        this._changeNav(),
        this._changeTitle(),
        this.autoHeight && this._resize(),
        this.onChanged && this.onChanged.call(this.scope || this, this.images[this.index], this.index)
    },

    _changeNav: function() {
      this.showNav && (this._navNode.find("span").removeClass("cui-slide-nav-item-current"), $(this._navNode.find("span")[this.index]).addClass("cui-slide-nav-item-current"))
    },

    _changeTitle: function() {
      this.showTitle && (this._titleNode.find("div").removeClass("cui-slide-nav-item-current-title"), $(this._titleNode.find("div")[this.index]).addClass("cui-slide-nav-item-current-title"))
    },

    _createImageContainer: function() {
      var a = this.images[this.index];
      if (this._loadingNode.css("display", "none"), !a.node) {
        {
          _.ElPosition.getElementPos(this._rootNode[0]).top - 48
        }
        a.node = $(a.loadError ? this._createImageHtml(this.errorImageUrl, a.alt) : this._createImageHtml(a.src, a.alt)),
          this._imageNode.append(a.node),
          a.node.css("position", "absolute").css("left", 0).css("text-align", "justify"),
          a.node.bind("click",
            function(a) {
              a.preventDefault()
            })
      }
      this.autoHeight && this._resize();
    },

    _createLoading: function() {
      if (this.firstLoad) {
        this._loadingNode = $(this._createImageHtml(this.loadImageUrl));
        var a = ['<div class="ct-breaking-load">', '<div class="ct-ui-w-loading">', "</div></div>"];
        this._loadingNode.addClass("ct-loading");
        this._loadingNode.html(a.join(" ")).hide(),
          this.autoHeight || (this._resize(), this._setLoadingPos()),
          this._imageNode.append(this._loadingNode),
          this.firstLoad = !1
      }
    },

    _setLoadingPos: function() {
      if (this._loadingNode.css("position", "absolute"), this._size.height) {
        var a = (this._size.height - 60) / 2;
        this._loadingNode.find(".cui-breaking-load").css("top", a)
      }
    },

    _showLoading: function() {
      this._loadingNode.css("display", ""),
        this._setLoadingPos()
    },

    _createDefault: function() {
      if (this.defaultImageUrl) {
        var a = new Image;
        a.src = this.defaultImageUrl;
        var b = this;
        a.onload = function() {
          var c = $(b._createImageHtml(b.defaultImageUrl));
          b._imageNode.append(c),
            b._displayImage = a,
            b.autoHeight ? b._setSize(a.height, a.width) : b._setSize(b.imageSize.height, b.imageSize.width)
        }
      }
    },

    _createImageHtml: function(a, b) {
      if(a!=undefined&&a!='')
        return '<div class="image-node slider-imageContainerNode"><img style="width:' + this._size.width + "px;height:" + this._size.height + 'px" src="' + a + '" alt="' + (b ? b: "") + '"></div>';
      else {
        return '<div class="image-node slider-imageContainerNode" style="width:'+this._size.width+'px;"><section id="scroller">'+(b ? b: "")+'<section></div>';
      }

    },

    addEvent: function ($super) {
      $super();
    }

  });


});
