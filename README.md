# 1. Introduction

A proof-of-concept application using a Flask back-end with SQLite3 and a Next.js front-end to showcase an application that users can use to check upon and compare different stocks to help them with their investments.

## 1.1 Building, running, and testing the application

### 1.1.1 Server

Use `source server-env/Scripts/activate` if running from Windows

```
cd server
pip install virtualenv
virtualenv server-env
source server-env/bin/activate
pip install -r requirements.txt
flask run
```

### 1.1.2 Client

Must have a running back-end before building the front-end as I'm using Static Site Generation to pre-render pages at compile time.  
This optimises the load time for a better experience for the user. Otherwise, we can skip the build and run using `npm run dev`

```
cd client
npm install
npm run build
npm run start
```

Access the webpage by going to http://127.0.0.1:3000/

### 1.1.3 Testing

Back-end

```
cd server
source server-env/bin/activate
pytest
```

Front-end (Application must be running)

```
cd client
npm run test:e2e
```

# 2. Requirements

## 2.1 Back-end

- Build an API solution given the supplied SQLite Database.
- Endpoints
  - An array of company entities
    - Optional query parameter to also fetch past share prices

## 2.2 Front-end

- Construct a front-end page that allows users to see the companies returned from the API.
- Page should allow users to see the following data for each company.
  - Company name
  - Unique symbol code
  - Last known share price (Most recent share price)
  - Company's overall snowflake score
- Functional
  - Sort by overall company score
  - Sort by price volatility within the last 90 days
  - Filter by exchange symbols
  - Filter by overall score
- Non-functional
  - Performance (assume that page will be frequently visited)
  - Extensibility (easily be able to add a mini share price chart for each company)
  - Stability (production-quality code, tests)

# 3. Further Improvements

I've listed a few improvements I would make if I had more time.

- Mobile support for styling.
- Visualisation of the company score to show all the specific scores for each company.
- Add a currency toggle to toggle between different currencies.
  - Convert USD to AUD using the `listing_currency_iso` attribute.
- More test cases.
  - I've added a few to create the base infrastructure for the testing and to show that testing is important for a reliable application.

# 4. Design Decisions

## 4.1 Volatility calculation

- Used a sampled relative standard deviation to calculate the volatility of prices within the last 90 days.
- Users may use this feature to get an idea of which stocks may be in their best interest.
  - If they want to lower risk, a lower volatility stock may be best for them.
  - If they are open to higher risk and/or are looking for buy and sell opportunities, a higher volatility stock may be best for them.

## 4.2 Previous company prices

Solution

- Previous prices can be queried by adding a `?show_prices` argument to the `/company` endpoint.
- Made this decision as that's the general rule of thumb when adding optional query parameters.
- Advantages:
  - Intuitive, it's easier to understand that `?show_prices` is an argument to the `/company` endpoint.

Alternative Solution

- Using routing parameters instead. Ex: `/company/show_prices`
- Advantages:
  - Allows for easier compatibility with specifications such as OpenAPI.
  - Explicitly shows that the `show_prices` is an endpoint of its own.

## 4.3 Framework choices

Back-end

- Javascript vs Python
  - Chose to use a Python back-end as I wanted to showcase both my Python and Javascript as I'll be using JS with the front-end framework.
- Django vs Flask
  - Chose to use Flask as it's more lightweight and minimal.
  - The PoC application for this challenge didn't need most of Django's "batteries included" features and I wanted to minimise as much library dependencies as possible.

Front-end

- In terms of the front-end framework, I wanted to try out Next.js as it was the framework that Simply Wall St uses in its products and also it had some nice features over React.js especially with the release of version 13.

## 4.4 REST vs GraphQL

- Decided to use REST as it's a server-driven architecture which allows decoupling of server and client side. We can just hit an endpoint from the client instead of having to build the query in the client side.
