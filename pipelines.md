# Azure DevOps Pipelines for NPM Package Repository

This document describes the ADO pipelines defined for repositories hosting publishable NPM packages.

## Pipelines Overview

### 1. Pull Request Pipeline (pr-pipeline.yml)
This pipeline runs on pull requests to the main branch to ensure code quality before merging.

**Purpose:** Validate code changes, run tests, and build the package.

**Ensuring Code Owners Involvement:**
To ensure code owners are always involved in the review process:
- Create a `CODEOWNERS` file in the root of the repository with entries like:
  ```
  * @username1 @username2
  src/ @team-lead
  ```
- In Azure DevOps:
  1. Go to Project Settings > Repositories > [Your Repository]
  2. Select the main branch policies
  3. Enable "Require review from additional reviewers"
  4. Select "Code owners" as the reviewer type
  5. Set minimum number of reviewers if needed

This ensures that merges to main require approval from designated code owners.

### 2. Main Branch CI Pipeline (main-pipeline.yml)
This pipeline runs on every push to the main branch to maintain continuous integration.

**Purpose:** Ensure the main branch is always in a buildable and testable state.

### 3. Publish Pipeline (publish-pipeline.yml)
This pipeline runs on pushes to main and automatically publishes to NPM when the package version is bumped.

**Purpose:** Automate the publishing process for new versions.

**How it works:**
- Compares the version in package.json with the latest published version on NPM
- If the version has increased, publishes the package
- Requires an NPM_TOKEN variable set in ADO pipeline variables

## Setup Instructions

1. Create the pipeline files in your repository under a `pipelines/` directory or directly in `.ado/pipelines/`
2. In Azure DevOps, create new pipelines from YAML files pointing to these files
3. Set up the following variables in your ADO pipeline (for publish pipeline):
   - `npmToken`: Your NPM authentication token
4. Configure branch policies as described above for code owner reviews

## Notes
- All pipelines use Node.js 18.x and Ubuntu agents
- Assumes standard npm scripts: `build`, `test`
- The publish pipeline uses npm view to check published version; ensure the package name in package.json is correct