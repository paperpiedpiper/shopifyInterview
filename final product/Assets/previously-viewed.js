// Logic to check if there are products to display instead of the bestsellers collection
//
// if yes, it replaces the section title list and the body, containing the featured products

document.addEventListener("DOMContentLoaded", function () {
    const previouslyViewedData = JSON.parse(localStorage.getItem("prvViewed"));
    const previouslyViewedDataSize = previouslyViewedData ? previouslyViewedData.length : 0;
    const maxSize = 4;
  
    if (!previouslyViewedData || previouslyViewedDataSize !== maxSize) return;
  
    const currentSection = document.querySelector(".collection-tabbed");
    const bestsellerSectionHeader = currentSection.querySelector(".tabbed-header");
    const bestsellerSectionBody = currentSection.querySelector(".tabbed-body");
  
    bestsellerSectionHeader.style.visibility = "hidden";
    bestsellerSectionBody.style.visibility = "hidden";
  
    async function getProductCardHTML(productHandle) {
      try {
        const response = await fetch( `/products/${productHandle}?section_id=collection-product-grid-test` );
        if ( !response.ok ) {
          throw new Error(`Failed to fetch the product. Reason: ${response.status}`);
        }
        const responseText = await response.text();
        return responseText;
        
      } catch (error) {
        return error;
      }
    }
  
    async function processProducts(products, parent) {

      for (const product of products) {
        try {
          const productCardHTML = await getProductCardHTML(product.handle);
          const productElementContainer = document.createElement("div");
          productElementContainer.innerHTML = productCardHTML;

          parent.querySelector(".products-carousel").appendChild(productElementContainer.firstElementChild.firstElementChild);

        } catch (error) {
          return error;
        }
      }
    }
  
    async function renderPreviouslyViewedSection() {
      try {
        const previouslyViewedSectionHTML = await fetch( "?section_id=previously-viewed-products" ).then(response => response.text());
        const previouslyViewedContainer = document.createElement("div");
        previouslyViewedContainer.innerHTML = previouslyViewedSectionHTML;
        await processProducts(previouslyViewedData, previouslyViewedContainer.firstElementChild);
  
        bestsellerSectionHeader.remove();
        bestsellerSectionBody.remove();
        currentSection.querySelector(".containwith-image").appendChild(previouslyViewedContainer.firstElementChild);

        $("#tabbed-previouslyViewed").slick({
          dots: false,
          infinite: false,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 766,
              settings: {
                dots: true,
                infinite: false,
                slidesToShow: 2,
              },
            },
          ],
        });

      } catch (error) {
        bestsellerSectionHeader.style.visibility = "visible";
        bestsellerSectionBody.style.visibility = "visible";
      }
    }
  
    renderPreviouslyViewedSection();
  });