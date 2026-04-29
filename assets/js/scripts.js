jQuery(document).ready(function() {
    "use strict";

/*===================================================================================*/
/*	OWL CAROUSEL
/*===================================================================================*/
jQuery(function () {
    var dragging = true;
    var owlElementID = "#owl-main";

    function fadeInReset() {
        if (!dragging) {
            jQuery(owlElementID + " .caption .fadeIn-1, " + owlElementID + " .caption .fadeIn-2, " + owlElementID + " .caption .fadeIn-3").stop().delay(800).animate({ opacity: 0 }, { duration: 400, easing: "easeInCubic" });
        }
        else {
            jQuery(owlElementID + " .caption .fadeIn-1, " + owlElementID + " .caption .fadeIn-2, " + owlElementID + " .caption .fadeIn-3").css({ opacity: 0 });
        }
    }

    function fadeInDownReset() {
        if (!dragging) {
            jQuery(owlElementID + " .caption .fadeInDown-1, " + owlElementID + " .caption .fadeInDown-2, " + owlElementID + " .caption .fadeInDown-3").stop().delay(800).animate({ opacity: 0, top: "-15px" }, { duration: 400, easing: "easeInCubic" });
        }
        else {
            jQuery(owlElementID + " .caption .fadeInDown-1, " + owlElementID + " .caption .fadeInDown-2, " + owlElementID + " .caption .fadeInDown-3").css({ opacity: 0, top: "-15px" });
        }
    }

    function fadeInUpReset() {
        if (!dragging) {
            jQuery(owlElementID + " .caption .fadeInUp-1, " + owlElementID + " .caption .fadeInUp-2, " + owlElementID + " .caption .fadeInUp-3").stop().delay(800).animate({ opacity: 0, top: "15px" }, { duration: 400, easing: "easeInCubic" });
        }
        else {
            $(owlElementID + " .caption .fadeInUp-1, " + owlElementID + " .caption .fadeInUp-2, " + owlElementID + " .caption .fadeInUp-3").css({ opacity: 0, top: "15px" });
        }
    }

    function fadeInLeftReset() {
        if (!dragging) {
            jQuery(owlElementID + " .caption .fadeInLeft-1, " + owlElementID + " .caption .fadeInLeft-2, " + owlElementID + " .caption .fadeInLeft-3").stop().delay(800).animate({ opacity: 0, left: "15px" }, { duration: 400, easing: "easeInCubic" });
        }
        else {
            jQuery(owlElementID + " .caption .fadeInLeft-1, " + owlElementID + " .caption .fadeInLeft-2, " + owlElementID + " .caption .fadeInLeft-3").css({ opacity: 0, left: "15px" });
        }
    }

    function fadeInRightReset() {
        if (!dragging) {
            jQuery(owlElementID + " .caption .fadeInRight-1, " + owlElementID + " .caption .fadeInRight-2, " + owlElementID + " .caption .fadeInRight-3").stop().delay(800).animate({ opacity: 0, left: "-15px" }, { duration: 400, easing: "easeInCubic" });
        }
        else {
            jQuery(owlElementID + " .caption .fadeInRight-1, " + owlElementID + " .caption .fadeInRight-2, " + owlElementID + " .caption .fadeInRight-3").css({ opacity: 0, left: "-15px" });
        }
    }

    function fadeIn() {
        jQuery(owlElementID + " .active .caption .fadeIn-1").stop().delay(500).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });
        jQuery(owlElementID + " .active .caption .fadeIn-2").stop().delay(700).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });
        jQuery(owlElementID + " .active .caption .fadeIn-3").stop().delay(1000).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });
    }

    function fadeInDown() {
        jQuery(owlElementID + " .active .caption .fadeInDown-1").stop().delay(500).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
        jQuery(owlElementID + " .active .caption .fadeInDown-2").stop().delay(700).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
        jQuery(owlElementID + " .active .caption .fadeInDown-3").stop().delay(1000).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
    }

    function fadeInUp() {
        jQuery(owlElementID + " .active .caption .fadeInUp-1").stop().delay(500).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
        jQuery(owlElementID + " .active .caption .fadeInUp-2").stop().delay(700).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
        jQuery(owlElementID + " .active .caption .fadeInUp-3").stop().delay(1000).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
    }

    function fadeInLeft() {
        jQuery(owlElementID + " .active .caption .fadeInLeft-1").stop().delay(500).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
        jQuery(owlElementID + " .active .caption .fadeInLeft-2").stop().delay(700).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
        jQuery(owlElementID + " .active .caption .fadeInLeft-3").stop().delay(1000).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
    }

    function fadeInRight() {
        jQuery(owlElementID + " .active .caption .fadeInRight-1").stop().delay(500).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
        jQuery(owlElementID + " .active .caption .fadeInRight-2").stop().delay(700).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
        jQuery(owlElementID + " .active .caption .fadeInRight-3").stop().delay(1000).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
    }

    jQuery(owlElementID).owlCarousel({

        autoPlay: 5000,
        stopOnHover: true,
        navigation: true,
        pagination: true,
        singleItem: true,
        addClassActive: true,
        transitionStyle: "fade",
        navigationText: ["<i class='icon fa fa-angle-left'></i>", "<i class='icon fa fa-angle-right'></i>"],

        afterInit: function() {
            fadeIn();
            fadeInDown();
            fadeInUp();
            fadeInLeft();
            fadeInRight();
        },

        afterMove: function() {
            fadeIn();
            fadeInDown();
            fadeInUp();
            fadeInLeft();
            fadeInRight();
        },

        afterUpdate: function() {
            fadeIn();
            fadeInDown();
            fadeInUp();
            fadeInLeft();
            fadeInRight();
        },

        startDragging: function() {
            dragging = true;
        },

        afterAction: function() {
            fadeInReset();
            fadeInDownReset();
            fadeInUpReset();
            fadeInLeftReset();
            fadeInRightReset();
            dragging = false;
        }

    });

if (jQuery(owlElementID).hasClass("owl-one-item")) {
    jQuery(owlElementID + ".owl-one-item").data('owlCarousel').destroy();
}

jQuery(owlElementID + ".owl-one-item").owlCarousel({
    singleItem: true,
    navigation: false,
    pagination: false
});




jQuery('.home-owl-carousel').each(function(){

    var owl = $(this);
    var  itemPerLine = owl.data('item');
    if(!itemPerLine){
        itemPerLine = 5;
    }
    owl.owlCarousel({
        items : itemPerLine,
       itemsDesktop : [1199,3],
        itemsTablet:[991,2],
        navigation : true,
        pagination : false,

        navigationText: ["", ""]
    });
});

jQuery('.homepage-owl-carousel').each(function(){

    var owl = $(this);
    var  itemPerLine = owl.data('item');
    if(!itemPerLine){
        itemPerLine = 4;
    }
    owl.owlCarousel({
        items : itemPerLine,
        itemsTablet:[991,2],
        itemsDesktop : [1199,3],
        navigation : true,
        pagination : false,

        navigationText: ["", ""]
    });
});

jQuery(".blog-slider").owlCarousel({
    items : 3,
    itemsDesktopSmall :[979,2],
    itemsDesktop : [1199,3],
    navigation : true,
    slideSpeed : 300,
    pagination: false,
    navigationText: ["", ""]
});

jQuery(".best-seller").owlCarousel({
    items : 3,
    navigation : true,
    itemsDesktopSmall :[979,2],
    itemsDesktop : [1199,2],
    slideSpeed : 300,
    pagination: false,
    paginationSpeed : 400,
    navigationText: ["", ""]
});

jQuery(".sidebar-carousel").owlCarousel({
    items : 1,
    itemsTablet:[978,1],
    itemsDesktopSmall :[979,2],
    itemsDesktop : [1199,1],
    navigation : true,
    slideSpeed : 300,
    pagination: false,
    paginationSpeed : 400,
    navigationText: ["", ""]
});

jQuery(".brand-slider").owlCarousel({
    items :6,
    navigation : true,
    slideSpeed : 300,
    pagination: false,
    paginationSpeed : 400,
    navigationText: ["", ""]
});    
jQuery("#advertisement").owlCarousel({
    items : 1,
	itemsTablet:[978,1],
    itemsDesktopSmall :[979,1],
    itemsDesktop : [1199,1],
    navigation : true,
    slideSpeed : 300,
    pagination: true,
    paginationSpeed : 400,
    navigationText: ["", ""]
});    



});

/*===================================================================================*/
/*  LAZY LOAD IMAGES USING ECHO
/*===================================================================================*/
jQuery(function(){
    echo.init({
        offset: 100,
        throttle: 250,
        unload: false
    });
});

/*===================================================================================*/
/*  RATING
/*===================================================================================*/

jQuery(function(){
    jQuery('.rating').rateit({max: 5, step: 1, value : 4, resetable : false , readonly : true});
});

/*===================================================================================*/
/* PRICE SLIDER
/*===================================================================================*/
jQuery(function () {

// Price Slider
if (jQuery('.price-slider').length > 0) {
    jQuery('.price-slider').slider({
        min: 100,
        max: 700,
        step: 10,
        value: [200, 500],
        handle: "square"

    });

}

});


/*===================================================================================*/
/* SINGLE PRODUCT GALLERY
/*===================================================================================*/
jQuery(function(){
    jQuery('#owl-single-product').owlCarousel({
        items:1,
        itemsTablet:[768,3],
        itemsDesktop : [1199,1],
        itemsTablet : [992,1],
        itemsDesktopSmall : [768,3]

    });

    jQuery('#owl-single-product-thumbnails').owlCarousel({
        items: 4,
        pagination: true,
        rewindNav: true,
        itemsTablet : [992,4],
        itemsDesktopSmall :[768,4],
        itemsDesktop : [992,1]
    });

    jQuery('#owl-single-product2-thumbnails').owlCarousel({
        items: 6,
        pagination: true,
        rewindNav: true,
        itemsTablet : [768, 4],
        itemsDesktop : [1199,3]
    });

    jQuery('.single-product-slider').owlCarousel({
        stopOnHover: true,
        rewindNav: true,
        singleItem: true,
        pagination: true
    });

  
});





/*===================================================================================*/
/*  WOW 
/*===================================================================================*/

jQuery(function () {
    new WOW().init();
});


/*===================================================================================*/
/*  TOOLTIP 
/*===================================================================================*/
jQuery("[data-toggle='tooltip']").tooltip();

/*===================================================================================*/
/*  PRODUCT SEARCH FILTER
/*===================================================================================*/
window.productData = window.productData || [];
window.allProducts = window.allProducts || [];

function escapeHTML(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key) || '';
}

function buildSearchUrl(searchTerm) {
  const url = new URL(window.location.href);
  url.searchParams.set('q', searchTerm);
  return url.pathname + '?' + url.searchParams.toString();
}

function isHomePage() {
  const name = window.location.pathname.split('/').pop();
  return name === 'home.html' || name === 'index.html' || name === '';
}

function getCategoryContainers() {
  return {
    grid: jQuery('#grid-container .category-product').first(),
    list: jQuery('#list-container .category-product').first()
  };
}

function isCategoryPage() {
  const containers = getCategoryContainers();
  return containers.grid.length > 0 || containers.list.length > 0;
}

function setSearchProductData(products) {
  window.productData = products.map(product => {
    const item = product.productMicroRow || {};
    const info = item.infoSection || {};
    const image = item.imageSection || {};

    return {
      name: info.name || '',
      category: 'All',
      link: info.link || '#',
      price: info.price || '',
      imgSrc: image.imgSrc || '',
      alt: image.alt || '',
      ratingClass: info.ratingClass || 'rateit-small',
      elements: []
    };
  });

  window.allProducts = window.productData;
}

async function loadProductData() {
  try {
    const response = await fetch('data/product.json');
    if (!response.ok) {
      throw new Error('Failed to load product data');
    }

    const data = await response.json();
    const products = data.products || [];
    setSearchProductData(products);

    if (isCategoryPage()) {
      renderCategoryProducts();
    }
  } catch (error) {
    console.error('Error loading product data:', error);
  }
}

function buildProductIndexFromDom() {
  window.allProducts = [];
  const seenNames = new Set();

  jQuery('.product-info .name a').each(function() {
    const $link = jQuery(this);
    const name = $link.text().trim();

    if (!name || seenNames.has(name)) {
      return;
    }

    seenNames.add(name);

    const $item = $link.closest('.item');
    const $element = $item.length ? $item : $link.closest('.product');

    if (!$element.length) {
      return;
    }

    window.allProducts.push({
      name,
      category: 'All',
      elements: [$element]
    });
  });
}

function buildSearchIndex() {
  if (window.productData.length) {
    window.allProducts = window.productData;
    return;
  }

  buildProductIndexFromDom();
}

function filterProducts(searchTerm, category) {
  const normalizedSearch = searchTerm.toLowerCase();

  return window.allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(normalizedSearch);
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });
}

function applySearchFilter(searchTerm, category) {
  const matchedProducts = filterProducts(searchTerm, category);
  const matchedSet = new Set(matchedProducts);

  window.allProducts.forEach(product => {
    const shouldShow = matchedSet.has(product);

    if (Array.isArray(product.elements) && product.elements.length) {
      product.elements.forEach(el => {
        if (el && el.length) {
          el.toggle(shouldShow);
        }
      });
    }
  });
}

function renderCategoryProducts() {
  const containers = getCategoryContainers();
  if (!containers.grid.length && !containers.list.length) {
    return;
  }

  const gridRoot = containers.grid.empty().append('<div class="row category-search-results"></div>').find('.category-search-results').first();
  const listRoot = containers.list.empty();

  window.productData.forEach(product => {
    const gridItem = jQuery(
      '<div class="col-sm-6 col-md-4 col-lg-3">' +
        '<div class="item">' +
          '<div class="products">' +
            '<div class="product">' +
              '<div class="product-image">' +
                '<div class="image">' +
                  '<a href="' + escapeHTML(product.link) + '">' +
                    '<img src="' + escapeHTML(product.imgSrc) + '" alt="' + escapeHTML(product.alt) + '">' +
                  '</a>' +
                '</div>' +
              '</div>' +
              '<div class="product-info text-left">' +
                '<h3 class="name"><a href="' + escapeHTML(product.link) + '">' + escapeHTML(product.name) + '</a></h3>' +
                '<div class="rating ' + escapeHTML(product.ratingClass) + '"></div>' +
                '<div class="description"></div>' +
                '<div class="product-price"> <span class="price">' + escapeHTML(product.price) + '</span> </div>' +
              '</div>' +
              '<div class="cart clearfix animate-effect">' +
                '<div class="action">' +
                  '<ul class="list-unstyled">' +
                    '<li class="add-cart-button btn-group">' +
                      '<button class="btn btn-primary icon" data-toggle="dropdown" type="button"> <i class="fa fa-shopping-cart"></i> </button>' +
                      '<button class="btn btn-primary cart-btn" type="button">Add to cart</button>' +
                    '</li>' +
                    '<li class="lnk wishlist"> <a class="add-to-cart" href="' + escapeHTML(product.link) + '" title="Wishlist"> <i class="icon fa fa-heart"></i> </a> </li>' +
                    '<li class="lnk"> <a class="add-to-cart" href="' + escapeHTML(product.link) + '" title="Compare"> <i class="fa fa-signal"></i> </a> </li>' +
                  '</ul>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );

    const listItem = jQuery(
      '<div class="category-product-inner">' +
        '<div class="products">' +
          '<div class="product-list product">' +
            '<div class="row product-list-row">' +
              '<div class="col col-sm-3 col-lg-3">' +
                '<div class="product-image">' +
                  '<div class="image">' +
                    '<img src="' + escapeHTML(product.imgSrc) + '" alt="' + escapeHTML(product.alt) + '">' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="col col-sm-9 col-lg-9">' +
                '<div class="product-info">' +
                  '<h3 class="name"><a href="' + escapeHTML(product.link) + '">' + escapeHTML(product.name) + '</a></h3>' +
                  '<div class="rating ' + escapeHTML(product.ratingClass) + '"></div>' +
                  '<div class="product-price"> <span class="price">' + escapeHTML(product.price) + '</span> </div>' +
                  '<div class="description m-t-10">Product details are loaded from JSON and filtered by search.</div>' +
                  '<div class="cart clearfix animate-effect">' +
                    '<div class="action">' +
                      '<ul class="list-unstyled">' +
                        '<li class="add-cart-button btn-group">' +
                          '<button class="btn btn-primary icon" data-toggle="dropdown" type="button"> <i class="fa fa-shopping-cart"></i> </button>' +
                          '<button class="btn btn-primary cart-btn" type="button">Add to cart</button>' +
                        '</li>' +
                        '<li class="lnk wishlist"> <a class="add-to-cart" href="' + escapeHTML(product.link) + '" title="Wishlist"> <i class="icon fa fa-heart"></i> </a> </li>' +
                        '<li class="lnk"> <a class="add-to-cart" href="' + escapeHTML(product.link) + '" title="Compare"> <i class="fa fa-signal"></i> </a> </li>' +
                      '</ul>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="tag hot"><span>hot</span></div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );

    product.elements = [gridItem, listItem];
    gridRoot.append(gridItem);
    listRoot.append(listItem);
  });

  if (jQuery('.rating').rateit) {
    jQuery('.rating').rateit({ max: 5, step: 1, value: 4, resetable: false, readonly: true });
  }
}

function ensureSuggestionBox() {
  const $searchContainer = jQuery('.search-area .control-group');
  if (!$searchContainer.length) {
    return jQuery();
  }

  let $box = $searchContainer.find('.search-suggestions');
  if (!$box.length) {
    $box = jQuery('<div class="search-suggestions"><ul></ul></div>');
    $searchContainer.append($box);
  }

  return $box;
}

function updateSearchSuggestions(searchTerm) {
  const $box = ensureSuggestionBox();
  if (!$box.length) {
    return;
  }

  const trimmedTerm = searchTerm.trim();
  if (!trimmedTerm) {
    $box.hide();
    return;
  }

  const normalizedTerm = trimmedTerm.toLowerCase();
  const suggestions = window.allProducts
    .filter(product => product.name.toLowerCase().includes(normalizedTerm))
    .slice(0, 6);

  const $list = $box.find('ul');
  $list.empty();

  if (!suggestions.length) {
    $list.append('<li class="no-results">No matching products found</li>');
    $box.show();
    return;
  }

  suggestions.forEach(product => {
    const label = escapeHTML(product.name);
    $list.append('<li class="search-suggestion-item">' + label + '</li>');
  });

  $box.show();
}

function performSearchRedirect(searchTerm) {
  if (!searchTerm) {
    return;
  }

  if (!isHomePage()) {
    window.location.href = buildSearchUrl(searchTerm);
    return;
  }

  updateSearchSuggestions(searchTerm);
  applySearchFilter(searchTerm, 'All');
}

jQuery(function() {
  loadProductData().then(function() {
    buildSearchIndex();

    const initialQuery = parseQueryParam('q');
    if (initialQuery) {
      jQuery('.search-field').val(initialQuery);
      updateSearchSuggestions(initialQuery);
      applySearchFilter(initialQuery, 'All');
    }
  });

  const $searchField = jQuery('.search-field');
  const $searchButton = jQuery('.search-button');
  const $suggestionBox = ensureSuggestionBox();
  let suggestionHideTimer = null;

  $searchButton.on('click', function(event) {
    event.preventDefault();
    performSearchRedirect($searchField.val().trim());
  });

  $searchField.on('keydown', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault();
      performSearchRedirect($searchField.val().trim());
      $suggestionBox.hide();
    }
  });

  jQuery('.search-area form').on('submit', function(event) {
    event.preventDefault();
    performSearchRedirect($searchField.val().trim());
    $suggestionBox.hide();
  });

  $searchField.on('input', function() {
    const searchTerm = $searchField.val();
    updateSearchSuggestions(searchTerm);
    applySearchFilter(searchTerm, 'All');
  });

  $searchField.on('focus', function() {
    updateSearchSuggestions($searchField.val());
  });

  $searchField.on('blur', function() {
    suggestionHideTimer = setTimeout(function() {
      $suggestionBox.hide();
    }, 150);
  });

  $suggestionBox.on('mousedown', '.search-suggestion-item', function() {
    clearTimeout(suggestionHideTimer);
    const value = jQuery(this).text();
    $searchField.val(value);
    performSearchRedirect(value);
    $suggestionBox.hide();
  });

  $searchButton.on('mousedown', function() {
    clearTimeout(suggestionHideTimer);
  });
});



})