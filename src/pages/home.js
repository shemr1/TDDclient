import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProductCard from "../components/productCard";

export default function HomePage() {
  const [data, setData] = useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();

  const getProducts = async () => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    getProducts();
    document.title = "My Big Bad Cake Shop";
  }, []);

  // Function to send user data to your backend
  const saveUserToBackend = async (userData) => {
    try {
      const response = await fetch("/api/saveUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.error) {
        console.error("Failed to save user data to backend");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  // When the user is authenticated, send their data to the backend
  if (isAuthenticated && !isLoading) {
    saveUserToBackend(user);
  }

  return !data ? (
    <div className="flex flex-col m-8 rounded shadow-md  animate-pulse h-96">
      <div className="h-48 rounded-t dark:bg-gray-700"></div>
      <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
        <div className="w-full h-6 rounded dark:bg-gray-700"></div>
        <div className="w-full h-6 rounded dark:bg-gray-700"></div>
        <div className="w-3/4 h-6 rounded dark:bg-gray-700"></div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center " data-testid="filter-test">
      <section className="bg-center bg-cover  bg-banner  bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56"></div>
      </section>

      <div className="flex justify-between items-center px-20 py-5">
        <h1 className="text-2xl uppercase font-bold mt-10 text-center mb-10">
          Featured Items
        </h1>
        <p>{!data ? "Loading..." : data.size}</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
        {data.products.data.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div className="divide-y divide- py-10">
        <section className="p-4 lg:p-8 dark:bg-gray-800 dark:text-gray-100">
          <div className="container mx-auto space-y-12">
            <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
              <img
                src="https://images.unsplash.com/photo-1618411640026-24e40dcde1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9udXR8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60"
                alt="https://unsplash.com/@anniespratt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                className="h-80 dark:bg-gray-500 aspect-video"
              />
              <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-900">
                <h3 className="text-3xl font-bold">
                  We're not reinventing the wheel
                </h3>
                <p className="my-6 dark:text-gray-400">
                  But sometimes you have to remember why the donut went go to
                  therapy? Because it felt like it was getting a little too
                  doughy in the middle!
                </p>
                <p className="self-start">Were sorry....... Not really</p>
              </div>
            </div>
            <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
              <img
                src="https://images.unsplash.com/photo-1639610834110-0de6043492f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2luZ2VyYnJlYWQlMjBob3VzZXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                alt="https://unsplash.com/@kronemberger"
                className="h-80 dark:bg-gray-500 aspect-video"
              />
              <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-900">
                <h3 className="text-3xl font-bold">
                  Were not a construction company
                </h3>
                <p className="my-6 dark:text-gray-400">
                  But what did the gingerbread cookie use to fix its house?
                </p>
                <span>Icing and gumdrops!</span>
              </div>
            </div>
            <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
              <img
                src="https://images.unsplash.com/photo-1612973835597-99b4e2558b07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="https://unsplash.com/@lewisandthebeast"
                className="h-80 dark:bg-gray-500 aspect-video"
              />
              <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-900">
                <h3 className="text-3xl font-bold">
                  Eureka, We've made a discovery
                </h3>
                <p className="my-6 dark:text-gray-400">
                  What did the muffin say to the cupcake during the experiment?
                </p>
                <span>"I think we've reached the crumb of the matter."</span>
              </div>
            </div>
          </div>
        </section>
        <section className="p-6 dark:bg-gray-800 dark:text-gray-100">
          <div className="container mx-auto p-4">
            <span className="block mb-2 text-xs font-medium tracki text-center uppercase dark:text-violet-400">
              How we works
            </span>
            <h2 className="text-5xl font-bold text-center dark:text-gray-50">
              Ordering Made Simple
            </h2>
            <div className="grid gap-6 my-16 lg:grid-cols-4">
              <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-400 dark:text-gray-900">
                  1
                </div>
                <p className="text-2xl font-semibold">
                  <b>Order.</b> Add products to cart.
                </p>
              </div>
              <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-400 dark:text-gray-900">
                  2
                </div>
                <p className="text-2xl font-semibold">
                  <b>Checkout.</b> Checkout your products.
                </p>
              </div>
              <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-400 dark:text-gray-900">
                  3
                </div>
                <p className="text-2xl font-semibold">
                  <b>Confirmation.</b> Wait for your confirmation email.
                </p>
              </div>
              <div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-400 dark:text-gray-900">
                  3
                </div>
                <p className="text-2xl font-semibold">
                  <b>Patience 😌.</b> Just wait for our progress complete email
                  and you're set!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="dark:bg-gray-800 dark:text-gray-100">
          <div className="container px-6 py-12 mx-auto">
            <div className="grid items-center gap-4 xl:grid-cols-5">
              <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
                <h2 className="text-4xl font-bold">What do you think of us?</h2>
                <p className="dark:text-gray-400">
                  Pri ex magna scaevola moderatius. Nullam accommodare no vix,
                  est ei diceret alienum, et sit cetero malorum. Et sea iudico
                  consequat, est sanctus adipisci ex.
                </p>
              </div>
              <div className="p-6 xl:col-span-3">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid content-center gap-4">
                    <div className="p-6 rounded shadow-md dark:bg-gray-900">
                      <p>
                        An audire commodo habemus cum. Ne sed corrumpit
                        repudiandae. Tota aliquip democritum pro in, nec
                        democritum intellegam ne. Propriae volutpat dissentiet
                        ea sit, nec at lorem inani tritani, an ius populo
                        perfecto vituperatoribus. Eu cum case modus salutandi,
                        ut eum vocent sensibus reprehendunt.
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <img
                          src="https://source.unsplash.com/50x50/?portrait?1"
                          alt=""
                          className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                        />
                        <div>
                          <p className="text-lg font-semibold">Leroy Jenkins</p>
                          <p className="text-sm dark:text-gray-400">
                            CTO of Company Co.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 rounded shadow-md dark:bg-gray-900">
                      <p>
                        Sit wisi sapientem ut, pri civibus temporibus
                        voluptatibus et, ius cu hinc fabulas. Nam meliore
                        minimum et, regione convenire cum id. Ex pro eros mucius
                        consectetuer, pro magna nulla nonumy ne, eam putent
                        iudicabit consulatu cu.
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <img
                          src="https://source.unsplash.com/50x50/?portrait?2"
                          alt=""
                          className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                        />
                        <div>
                          <p className="text-lg font-semibold">Leroy Jenkins</p>
                          <p className="text-sm dark:text-gray-400">
                            CTO of Company Co.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid content-center gap-4">
                    <div className="p-6 rounded shadow-md dark:bg-gray-900">
                      <p>
                        Putant omnium elaboraret per ut. Id dicta tritani
                        nominavi quo, mea id justo errem elaboraret. Agam mollis
                        scripserit ea his, ut nec postea verear persecuti. Ea
                        noster senserit eam, ferri omittantur ei nec. Id mel
                        solet libris efficiantur, commune explicari et eos. Case
                        movet ad est, sed tota vocent appetere ea.
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <img
                          src="https://source.unsplash.com/50x50/?portrait?3"
                          alt=""
                          className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                        />
                        <div>
                          <p className="text-lg font-semibold">Leroy Jenkins</p>
                          <p className="text-sm dark:text-gray-400">
                            CTO of Company Co.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 rounded shadow-md dark:bg-gray-900">
                      <p>
                        Te omnes virtute volutpat sed. Ei esse eros interesset
                        vel, ei populo denique ocurreret vix, eu cum pertinax
                        mandamus vituperatoribus. Solum nihil luptatum per ex,
                        ei amet viderer eos. Ea illum labitur mnesarchum pro.
                        Eius meis salutandi ei nam, alterum expetenda et nec.
                        Expetenda intellegat at eum, per mazim sanctus
                        honestatis ad. Ei noluisse invenire vix. Te ancillae
                        patrioque qui, probo bonorum vivendum ex vim.
                      </p>
                      <div className="flex items-center mt-4 space-x-4">
                        <img
                          src="https://source.unsplash.com/50x50/?portrait?4"
                          alt=""
                          className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                        />
                        <div>
                          <p className="text-lg font-semibold">Leroy Jenkins</p>
                          <p className="text-sm dark:text-gray-400">
                            CTO of Company Co.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
