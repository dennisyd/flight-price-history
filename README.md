## flight price history

> see how the prices for your favourite flightpaths change over time

## how it works:

0. daily cronjob scheduled with github actions hits /api/flights/ endpoint
1. serverless function pulls a bunch of data from skyscanner api
2. process & reformat data
3. write into a postgres database hosted on railway.app
4. this triggers a nextjs deploy hook to rebuild the **static website** & update with new data

i did this as an exercise in backend architecture. i wanted to see how easy you can make a zero-cost fullstack app in 2023 with no running servers (bar pg) #serverlessenjoyer

## strech goals (PRs welcome):

- click on individual days to see the skyscanner /poll/ endpoint results
- make better graph, the chart.js api is a residentSleeper
- skyscanner giving me a private API key

todo:
[ ] build cronjob

---

## The main problem is that I'm using Skyscanner's public API

Skyscanner lets you retrieve prices in two ways:

- The `/create` endpoint, which gets cached, and sometimes outdated, prices for a range of dates.
- The `/poll` endpoint, which gets the live price for one date.

For each route, we need the ticket price for 7 days ahead and 30 days ahead. This means for `n` routes, we need `n*2` prices. If we used the `/poll` endpoint, we'd make `n*2` requests, but with the `/create` endpoint, we only have to make `n` requests. The catch is that the `/create` endpoint often provides inaccurate prices. Skyscanner says the cache limit is 4 days.

Here's an example of the discrepancy between prices the two endpoints provide. Prices in USD. Example uses the LGW to BOS route:

| dateinjan |  createprice  | pollprice | difference |
|:---------:|:-------------:|:---------:|:----------:|
| 3         | 731           | 731       | 0          |
| 4         | 798           | 798       | 0          |
| 5         | 761           | 442       | -319       |
| 6         | 761           | 437       | -324       |
| 7         | 761           | 761       | 0          |
| 8         | 832           | 827       | -5         |
| 9         | 731           | 407       | -324       |
| 10        | 406           | 405       | -1         |
| 11        | 390           | 389       | -1         |
| 12        | 761           | 442       | -319       |
| 13        | 430           | 437       | 7          |
| 14        | 423           | 437       | 14         |
| 15        | 477           | 437       | -40        |
| 16        | 408           | 382       | -26        |
| 17        | 383           | 407       | 24         |
| 18        | 387           | 407       | 20         |
| 19        | 415           | 414       | -1         |
| 20        | 468           | 437       | -31        |
| 21        | 422           | 437       | 15         |
| 22        | 431           | 436       | 5          |
| 23        | 658           | 407       | -251       |
| 24        | 408           | 407       | -1         |
| 25        | 404           | 404       | 0          |
| 26        | 431           | 437       | 6          |
| 27        | 690           | 437       | -253       |
| 28        | 438           | 407       | -31        |
| 29        | 438           | 437       | -1         |
| 30        | 568           | 407       | -161       |
| 31        | 403           | 407       | 4          |

- largest difference: -324
- average difference: -52.74

---

here's the original data for the table above because i asked copilot to make it for me and i cba to proofread it.

dateinjan,createprice,pollprice,difference
3,731,731,0
4,798,798,0
5,761,442,-319
6,761,437,-324
7,761,761,0
8,832,827,-5
9,731,407,-324
10,406,405,-1
11,390,389,-1
12,761,442,-319
13,430,437,7
14,423,437,14
15,477,437,-40
16,408,382,-26
17,383,407,24
18,387,407,20
19,415,414,-1
20,468,437,-31
21,422,437,15
22,431,436,5
23,658,407,-251
24,408,407,-1
25,404,404,0
26,431,437,6
27,690,437,-253
28,438,407,-31
29,438,437,-1
30,568,407,-161
31,403,407,4
