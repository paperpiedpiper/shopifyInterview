# Great task from a recent Shopify dev role interview.
<br />

## Initial situation:
> A Shopify store's e-commerce page, on its homepage currently displays the following Shopify section featuring a chosen set of collections using a tabbed carousel layout

![Screenshot 2024-05-01 144944](https://github.com/paperpiedpiper/shopifyInterview/assets/105975348/c70f5d7d-6596-4190-981d-df7ae6cad5e8)

<br />

## Challenge?
> If applicable, replace the tabbed collections carousel with a single 'collection' that displays the product feature of the last 4 product pages accessed in this shop

![Screenshot 2024-05-01 145023](https://github.com/paperpiedpiper/shopifyInterview/assets/105975348/ee82d460-0596-47d0-b704-afe619409604)

<br />

## Solution!
> A .liquid snippet to cache the full JSON description of each product that had its page visited by the user
> and store it using the browser's localStorage API

![Screenshot 2024-05-01 145954](https://github.com/paperpiedpiper/shopifyInterview/assets/105975348/622ce901-9624-4b4d-b6cf-7adcdb95e714)
