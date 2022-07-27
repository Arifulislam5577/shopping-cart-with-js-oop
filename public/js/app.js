import * as icons from "phosphor-icons";
import axios from "axios";
const listBtn = document.querySelector(".list-btn");
const closeBtn = document.querySelector(".close-btn");
const newProductArea = document.querySelector("#new-Product");
const menu = document.querySelector(".menu");

listBtn.addEventListener("click", () => {
  listBtn.classList.add("hidden");
  closeBtn.classList.remove("hidden");
  menu.classList.toggle("nav-open");
});

closeBtn.addEventListener("click", () => {
  listBtn.classList.remove("hidden");
  closeBtn.classList.add("hidden");
  menu.classList.toggle("nav-open");
});

const renderSpinner = function (parentEl) {
  const markup = `
  <div class="w-full">
    <i class="ph-spinner-fill mx-auto text-6xl text-slate-900 animate-spin"></i>
  </div>`;
  parentEl.insertAdjacentHTML("beforeend", markup);
};

const generateMarkUp = ({ title, price, url }) => {
  const markup = `
    
    <div class="col-span-1 ">
              <div class="p-4 bg-slate-900 rounded-md overflow-hidden shadow-lg relative">
                <div class="product-img">
                  <img
                    src="${url}"
                    alt="watch"
                    class="h-52 object-contain mx-auto w-full"
                  />
                  <div class="product-details text-center mt-3">
                    <h3 class="text-white uppercase md:font-bold md:text-xl text-sm">
                      ${title}
                    </h3>
                    <h3 class="text-white uppercase md:font-bold md:text-xl text-sm">$${price}</h3>
                  </div>
                  <button
                    class="absolute bottom-0 right-0  flex items-center p-2"
                  >
                    <i
                      class="ph-handbag icons text-xl cursor-pointer text-white"
                    ></i>
                  </button>
                  <button class="absolute top-4 right-4 flex items-center p-2">
                    <i
                      class="ph-heart icons text-xl cursor-pointer text-white"
                    ></i>
                  </button>
                </div>
              </div>
            </div> 
    
    
    
    `;

  newProductArea.insertAdjacentHTML("beforeend", markup);
};

async function getProduct() {
  renderSpinner(newProductArea);

  const { data } = await axios.get(
    `https://rolex-shopping.herokuapp.com/api/v1/products`
  );

  newProductArea.innerHTML = "";

  data?.products.slice(0, 4).map((product) => generateMarkUp(product));
}

window.addEventListener("load", getProduct);
