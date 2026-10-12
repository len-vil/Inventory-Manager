
interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

let products: Product[] = [
    {
        id: 1,
        name: "Jowar",
        price: 500,
        quantity: 500
    }
];

let nextId = 2;

const productForm = document.getElementById(
    "productForm"
) as HTMLFormElement;

const nameInput = document.getElementById(
    "productName"
) as HTMLInputElement;

const priceInput = document.getElementById(
    "productPrice"
) as HTMLInputElement;

const quantityInput = document.getElementById(
    "productQuantity"
) as HTMLInputElement;

const inventoryTable = document.getElementById(
    "inventoryTable"
) as HTMLTableSectionElement;

const totalProducts = document.getElementById(
    "totalProducts"
) as HTMLElement;

const message = document.getElementById(
    "message"
) as HTMLElement;

function renderInventory(): void {
    inventoryTable.replaceChildren();

    products.forEach((product) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;

        const priceCell = document.createElement("td");
        priceCell.textContent = product.price.toFixed(2);

        const quantityCell = document.createElement("td");
        quantityCell.textContent = String(product.quantity);

        const actionCell = document.createElement("td");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", () => {
            products = products.filter(
                item => item.id !== product.id
            );

            renderInventory();
            message.textContent =
                `${product.name} removed successfully.`;
        });

        actionCell.appendChild(removeButton);

        row.append(
            nameCell,
            priceCell,
            quantityCell,
            actionCell
        );

        inventoryTable.appendChild(row);
    });

    totalProducts.textContent = String(products.length);
}

productForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);

    if (
        name.length === 0 ||
        !Number.isFinite(price) ||
        price <= 0 ||
        !Number.isInteger(quantity) ||
        quantity < 0
    ) {
        message.textContent =
            "Enter a valid name, price and quantity.";
        return;
    }

    const newProduct: Product = {
        id: nextId++,
        name: name,
        price: price,
        quantity: quantity
    };

    products.push(newProduct);

    productForm.reset();
    renderInventory();

    message.textContent =
        `${newProduct.name} added successfully.`;
});

renderInventory();
