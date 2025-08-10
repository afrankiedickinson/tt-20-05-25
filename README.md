## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
  * [Prerequisite Node.js v22.17.1]
  * [Latest PNPM]

### Installation

**Install dependencies:**

```bash
pnpm install
pnpm test:unit 
cd tt-20-05-25/apps/dashboard-ui/
pnpm dev
```
Navigate to http://localhost:5173 to see the dashboard

-----

## 🏃‍♀️ Running the Project

Use the following commands to run the application and its associated tests.

### Running the Application

To start the application in development mode, run:

To run the api:

```bash
    cd tt-20-05-25/apps/analytics-api/
    pnpm dev
```
To run the dashboard: 

```bash
    cd tt-20-05-25/apps/dashboard-ui/
    pnpm dev
```
The application will be available at `http://localhost:5173`.

### Running Tests

To execute the test suite, run the following command:

```bash
   cd tt-20-05-25/apps/analytics-api/
   pnpm test:unit
```

```bash
   cd tt-20-05-25/apps/dashboard-ui/
   pnpm test:unit
```
This will run all unit and integration tests defined for the project.

-----
## Architecture
Architecture Overview

Due to the size of the data, we were unable to store it in the browser and opted for a server-side architecture. The client is used minimally, only for the purpose of displaying data.

#### Performance & Data Loading

To ensure smooth performance, we've implemented a sliding window architecture that returns the current, previous, and next pages of data. When a user clicks "next," we instantly switch to the pre-fetched next page and then request the following page in the background. This approach ensures the table's performance feels seamless.

For loading data, we are using the useQuery hook from React Query. All chart components are self-contained, using their own endpoints and polling for data periodically in the background.

#### API Design

For the API, we have chosen a feature-based architecture, separating key mutations into distinct methods so they can be easily unit-tested.

-----

## ✨ Improvements

Given more time, here are some improvements I would consider implementing:

  * **Enhanced Testing**:
      * **Testing Strategy**: For a production version we would unit tests per custom component. Relying heavily on ui automation for integration tests to test out ui application logic using playwright. Both integration and e2e. 
      * **End-to-End (E2E) Testing**: Implement E2E tests Playwright to simulate real user interactions and validate entire application flows.
      * **API Integration tests**: For APIs integration tests we would utilise the postgres database to test records since this project does not include an API I have opted to rely heavily on unit testing. In general I would utilise integration tests if a datastore exist to test again and the project contains writes. 

  * **Code Quality & Refactoring**:
      * **Typing**: With more time I would add types to the context and other areas to catch errorrs. Avoiding `any` types and using `type` instead.
      * **Error Handling**: Handling errors with feedback in the browser and async errors with in app warnings giving feedback to the user. 
-----

## 📝 Production Architecture

#### AWS RDS

When designing this project's architecture, it's key to understand that a relational database can comfortably handle over 50,000 reads per second. My strategy is to start with a solid foundation, identify bottlenecks as they arise, and then evolve the architecture.

I've selected AWS RDS for PostgreSQL as the core database. Its ACID compliance ensures data integrity with minimal maintenance overhead, and most importantly, it supports powerful database indexes. My approach to tackling key bottlenecks, such as the /trends and /comparison endpoints, starts here. By creating indexes on frequently filtered columns like event_timestamp, study_type, and region, the database can perform aggregations efficiently and avoid slow, full-table scans.

Proactive performance management is crucial. I'll implement query response time monitoring with a strict performance threshold, such as a 500ms API response time. If response times exceed this, alerts will trigger an immediate review to optimize the underlying queries, fixing performance issues before they impact users.

#### API, Scaling, & Caching Layer (AWS Lambda & ElastiCache)

For the API, I chose AWS Lambda for its automatic, dynamic scaling. It effortlessly handles traffic spikes by spinning up instances on demand and scales down to zero when idle, which is incredibly cost-effective.

While this model can introduce latency known as a "cold start," I'll mitigate this to guarantee a snappy dashboard experience by using Provisioned Concurrency. This keeps a specified number of Lambda functions "warm" and ready to execute instantly, eliminating cold starts for our most critical, user-facing endpoints.

The final performance boost at this layer is an aggressive caching strategy using Redis (via AWS ElastiCache). When a request with specific filters arrives, the system first checks the cache. If the data exists (a cache hit), it's returned in milliseconds. If not (a cache miss), the API queries the database, stores the result in the cache for a short period, and then returns the data. This combination of on-demand scaling, warm functions, and caching creates a highly performant and resilient API.

#### Future Scaling (CQRS & Event-Driven Architecture)

Looking ahead, if the platform scales significantly, my proposed next step is to implement a CQRS (Command Query Responsibility Segregation) pattern. The design is naturally read-heavy, so separating write operations (e.g., a participant applying to a study) from the read operations that power the dashboard is the ideal path forward.

In this model, write commands would update the primary RDS database. Simultaneously, an event-driven process would populate a separate, highly optimized read model (like pre-aggregated tables or an Elasticsearch cluster). This allows the dashboard to query a datastore purpose-built for high-speed analytics, ensuring performance remains stellar regardless of data volume.

Adopting this event-driven architecture is a strategic trade-off, increasing complexity for a massive gain in performance and scalability. It's a natural evolution once the initial architecture begins to show bottlenecks under heavy load.
