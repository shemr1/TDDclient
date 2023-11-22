// cartContext.test.js

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { CartContext, CartProvider } from "./cartContext";

describe("CartContext", () => {
  it("should add an item to the cart", () => {
    const TestComponent = () => {
      const { addToCart, cartItems } = React.useContext(CartContext);

      const handleAddItemToCart = () => {
        addToCart({ id: 1, name: "Item 1", price: 549 });
      };

      return (
        <div>
          <div data-testid="cart">{cartItems.length}</div>
          <button onClick={handleAddItemToCart}>Add to Cart</button>
          <div data-testid="cart2">{cartItems.length}</div>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Check if the cart is initially empty
    expect(screen.getByTestId("cart").textContent).toEqual("0");

    // Click on the "Add to Cart" button
    fireEvent.click(screen.getByText("Add to Cart"));

    // Check if the item is added to the cart
    expect(screen.getByTestId("cart2").textContent).toEqual("1");
  });

  test("should remove item from the cart", () => {
    const TestComponent = () => {
      const { addToCart, removeFromCart, cartItems, clearCart } =
        React.useContext(CartContext);

      const handleAddItemToCart = () => {
        addToCart({ id: 1, name: "Item 1", price: 549 });
      };

      const handleRemoveItemToCart = () => {
        removeFromCart({ id: 1, name: "Item 1", price: 549 });
      };

      const handleClear = () => {
        clearCart();
      };

      return (
        <div>
          <button onClick={handleClear}>Clear</button>
          <div data-testid="cart">{cartItems.length}</div>
          <button onClick={handleAddItemToCart}>Add to Cart</button>
          <div data-testid="cart2">{cartItems.length}</div>
          <button onClick={handleRemoveItemToCart}>Remove from Cart</button>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Clear"));
    expect(screen.getByTestId("cart").textContent).toEqual("0");

    fireEvent.click(screen.getByText("Add to Cart"));
    expect(screen.getByTestId("cart2").textContent).toEqual("1");

    fireEvent.click(screen.getByText("Remove from Cart"));

    expect(screen.getByTestId("cart2").textContent).toEqual("0");
  });

  it("should increase an item count within the cart", () => {
    const TestComponent = () => {
      const { addToCart, cartItems, clearCart } = React.useContext(CartContext);

      const handleAddItemToCart = () => {
        addToCart({ id: 1, name: "Item 1", price: 549 });
      };

      return (
        <div>
          <button onClick={clearCart}>Clear</button>
          <div data-testid="cart">{cartItems.length}</div>
          <button onClick={handleAddItemToCart}>Add to Cart</button>
          <div data-testid="cart2">
            {cartItems.map((item) => (
              <div key={item.id}>{item.quantity}</div>
            ))}
          </div>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Check if the cart is initially empty
    expect(screen.getByTestId("cart").textContent).toEqual("0");

    // Click on the "Add to Cart" button
    fireEvent.click(screen.getByText("Add to Cart"));

    // Click on the "Add to Cart" button
    fireEvent.click(screen.getByText("Add to Cart"));

    // Check if the item is added to the cart
    expect(screen.getByTestId("cart2").textContent).toEqual("2");
  });

  test("should reduce item count from the cart", () => {
    const TestComponent = () => {
      const { addToCart, removeFromCart, cartItems, clearCart } =
        React.useContext(CartContext);

      const handleAddItemToCart = () => {
        addToCart({ id: 1, name: "Item 1", price: 549 });
      };

      const handleRemoveItemToCart = () => {
        removeFromCart({ id: 1, name: "Item 1", price: 549 });
      };

      const handleClear = () => {
        clearCart();
      };

      return (
        <div>
          <button onClick={handleClear}>Clear</button>
          <div data-testid="cart">{cartItems.length}</div>
          <button onClick={handleAddItemToCart}>Add to Cart</button>
          <div data-testid="cart2">
            {cartItems.map((item) => (
              <div key={item.id}>{item.quantity}</div>
            ))}
          </div>
          <button onClick={handleRemoveItemToCart}>Remove from Cart</button>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Clear"));
    expect(screen.getByTestId("cart").textContent).toEqual("0");

    fireEvent.click(screen.getByText("Add to Cart"));

    fireEvent.click(screen.getByText("Add to Cart"));
    expect(screen.getByTestId("cart2").textContent).toEqual("2");

    fireEvent.click(screen.getByText("Remove from Cart"));

    expect(screen.getByTestId("cart2").textContent).toEqual("1");
    fireEvent.click(screen.getByText("Clear"));
  });

  it("should remove items below 1 in count", () => {
    const TestComponent = () => {
      const { addToCart, cartItems, clearCart, removeFromCart } =
        React.useContext(CartContext);

      const handleAddItemToCart = () => {
        addToCart({ id: 1, name: "Item 1", price: 549 });
      };

      const handleRemoveItemToCart = () => {
        removeFromCart({ id: 1, name: "Item 1", price: 549 });
      };

      return (
        <div>
          <button onClick={clearCart}>Clear</button>
          <div data-testid="cart">{cartItems.length}</div>
          <button onClick={handleAddItemToCart}>Add to Cart</button>

          <div data-testid="cart2">{cartItems.length}</div>
          <button onClick={handleRemoveItemToCart}>Remove from Cart</button>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Clear"));
    // Check if the cart is initially empty
    expect(screen.getByTestId("cart").textContent).toEqual("0");

    // Click on the "Add to Cart" button
    fireEvent.click(screen.getByText("Add to Cart"));

    // Check if the item is added to the cart
    expect(screen.getByTestId("cart2").textContent).toEqual("1");

    fireEvent.click(screen.getByText("Remove from Cart"));

    expect(screen.getByTestId("cart2").textContent).toEqual("0");
  });

  it("should increase total amount of unique items", () => {
    const TestComponent = () => {
      const { addToCart, cartItems, clearCart } = React.useContext(CartContext);

      const handleAddItemToCart = () => {
        addToCart({ id: 1, name: "Item 1", price: 549 });
      };

      const handleAddItemToCart2 = () => {
        addToCart({ id: 2, name: "Item 2", price: 649 });
      };
      return (
        <div>
          <button onClick={clearCart}>Clear</button>
          <div data-testid="cart">{cartItems.length}</div>
          <button onClick={handleAddItemToCart}>Add to Cart1</button>
          <div data-testid="cart2">{cartItems.length}</div>
          <button onClick={handleAddItemToCart2}>Add to Cart2</button>
          <div data-testid="cart3">{cartItems.length}</div>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Clear"));
    // Check if the cart is initially empty
    expect(screen.getByTestId("cart").textContent).toEqual("0");

    // Click on the "Add to Cart" button
    fireEvent.click(screen.getByText("Add to Cart1"));

    // Check if the item is added to the cart
    expect(screen.getByTestId("cart2").textContent).toEqual("1");

    fireEvent.click(screen.getByText("Add to Cart2"));

    expect(screen.getByTestId("cart3").textContent).toEqual("2");
  });

  it("should give the total cost", () => {
    const TestComponent = () => {
      const { addToCart, cartItems, clearCart, getCartTotal } =
        React.useContext(CartContext);

      const handleAddItemToCart = () => {
        addToCart({ id: 1, name: "Item 1", price: 549 });
      };

      const handleAddItemToCart2 = () => {
        addToCart({ id: 2, name: "Item 2", price: 649 });
      };
      return (
        <div>
          <button onClick={clearCart}>Clear</button>
          <div data-testid="cart">{cartItems.length}</div>
          <button onClick={handleAddItemToCart}>Add to Cart1</button>
          <div data-testid="cart2">{cartItems.length}</div>
          <button onClick={handleAddItemToCart2}>Add to Cart2</button>
          <div data-testid="cart3">{cartItems.length}</div>
          <div data-testid="total">{getCartTotal()}</div>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Clear"));
    // Check if the cart is initially empty
    expect(screen.getByTestId("cart").textContent).toEqual("0");

    // Click on the "Add to Cart" button
    fireEvent.click(screen.getByText("Add to Cart1"));

    // Check if the item is added to the cart
    expect(screen.getByTestId("cart2").textContent).toEqual("1");

    fireEvent.click(screen.getByText("Add to Cart2"));

    expect(screen.getByTestId("cart3").textContent).toEqual("2");

    expect(screen.getByTestId("total").textContent).toEqual("1198")
  });
});
