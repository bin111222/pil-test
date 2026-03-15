# Connect PIL Storefront to Shopify (from scratch)

You need **one required value** and **one optional value** from Shopify.

| Variable | Required? | What it does |
|----------|-----------|----------------|
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL` | **Yes** | Your store’s Storefront API URL. With only this, products and collections work (tokenless). |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Optional | Storefront API token. Needed for **cart and checkout**. |

---

## Part 1: Get the Store URL (required)

Your Storefront API URL is:

```text
https://YOUR-STORE.myshopify.com/api/2024-01/graphql.json
```

Replace **YOUR-STORE** with your store’s myshopify subdomain.

**How to find YOUR-STORE:**

1. Open your **Shopify admin**: `https://admin.shopify.com/store/YOUR-STORE`
2. The part after `/store/` is your store name (e.g. `pil-test` or `pilindia`).
3. So your URL is: `https://pil-test.myshopify.com/api/2024-01/graphql.json` (or use your real store name).

**Add it to the project:**

1. In the `pil-store` folder, create or edit **`.env.local`**.
2. Add this line (use your real store name):

```env
NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL=https://YOUR-STORE.myshopify.com/api/2024-01/graphql.json
```

3. Restart the dev server: `npm run dev`.

**Result:** Homepage and collection pages will load **products and collections** from Shopify. Cart/checkout will still show “Configure Shopify to enable cart” until you add the token (Part 2).

---

## Part 2: Get the Storefront API token (optional, for cart & checkout)

The token is needed for **add to cart** and **checkout**. You get it from a **custom app** in your store’s admin.

### Step A: Open your store admin

- Go to: `https://admin.shopify.com/store/YOUR-STORE`  
  (Use the same store as in Part 1, e.g. `pil-test`.)

### Step B: Go to Apps and enable custom apps

1. In the left sidebar, click **Settings** (gear at the bottom).
2. Click **Apps and sales channels** (or **Apps**).
3. Click **Develop apps** (top right).
4. If you see **“Build apps in Dev Dashboard”** and no “Create app” option:
   - Look on that same page for a link like **“Develop apps for your store”** or **“Allow custom app development”** and turn it on.
   - Or click **“Build apps in Dev Dashboard”** and in the Dev Dashboard create an app, then install it on this store; the Storefront token may appear in the app’s **API credentials** or in the store after install (Settings → Apps → [your app]).
5. If you **do** see **“Create app”** or **“Create an app manually”**:
   - Click it and name the app (e.g. **PIL Storefront**).
   - After it’s created, go to **Configuration** → **Storefront API integration** → **Configure**.
   - Enable the Storefront API scopes you need (e.g. read products/collections, write checkouts).
   - Save, then open **API credentials**.
   - Find **Storefront API access token** → **Reveal token once** → copy it.

### Step C: Add the token to the project

1. Open **`.env.local`** in `pil-store`.
2. Add (paste your token):

```env
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_copied_token_here
```

3. Restart the dev server.

**Result:** Add to cart and “Proceed to checkout” will work and redirect to Shopify checkout.

---

## Quick reference: .env.local

**Minimum (products + collections only):**

```env
NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL=https://pil-test.myshopify.com/api/2024-01/graphql.json
```

**Full (products + collections + cart + checkout):**

```env
NEXT_PUBLIC_SHOPIFY_STOREFRONT_URL=https://pil-test.myshopify.com/api/2024-01/graphql.json
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
```

---

## Bestsellers on the homepage

The homepage carousel uses a collection whose **handle** is `bestsellers`. In Shopify:

- **Products** → **Collections** → create or edit a collection.
- Set its **handle** to `bestsellers` (the URL will be `.../collections/bestsellers`).

Then the carousel will show that collection’s products.
