The analytics-api requires a auth header with the value of "Bearer mock-header" 

curl -H "Authorization: Bearer mock-header" http://localhost:3001/analytics/health

Archictecture of the frontend

Since we need to store 50k+ records and we assume we would have millions of records of the life time of the app.

Any query in the worst case could have a million results. Therefore we should do all filtering server side and only display the current, previous and next page of the table.

This is a sliding window approach which means that we avoid a potential memory leak.

Production

Use AWS RDS for the database

On the frontend we can use request batching to reduce number of requests to one for refreshing the graphs and table.
