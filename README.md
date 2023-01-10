how it works:
0. daily cronjob scheduled with github actions hits a serverless function
1. serverless function pulls data from skyscanner api
2. process & reformat data
3. post into postgres database hosted with railway.app
4. trigger nextjs deploy hook to rebuild static website & update with new data from railway

why?
- an exercise in optimizting backend architecture
- setup so that there are no running servers (bar postgres)


todo:
- this one thing i forgorrrr
- react frontend
- build hook

stretch:
- click on individual days to see the skyscanner /poll/ endpoint results (3 days)
- add form for users to submit flight paths
- contact skyscanner to ask for personal API key


todo:
[x] migrate prisma api
[ ] build form
[ ] build chart
[ ] build cronjob


example of how inaccurate skyscanner's data is:

USD
day,expected,actual,difference
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

average difference: -52.74 ?!
