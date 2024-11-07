# Contributing to Svelte Animated Icons

Thank you for your interest in contributing to Svelte Animated Icons! We welcome contributions from the community and are grateful for any help you can provide.

## Table of Contents

- [Contributing to Svelte Animated Icons](#contributing-to-svelte-animated-icons)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [Getting Started](#getting-started)
  - [Development Process](#development-process)
  - [Submitting Changes](#submitting-changes)
    - [Pull Request Guidelines](#pull-request-guidelines)
  - [Style Guidelines](#style-guidelines)
    - [Code Style](#code-style)
    - [Commit Messages](#commit-messages)
  - [Adding New Icons](#adding-new-icons)
    - [Icon Requirements](#icon-requirements)
  - [Testing](#testing)
  - [Documentation](#documentation)
  - [Questions and Discussions](#questions-and-discussions)
  - [License](#license)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to project maintainers.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone git@github.com:YOUR_USERNAME/svelte-animated-icons.git
   ```
3. Install dependencies:
   ```bash
   cd svelte-animated-icons
   pnpm install
   ```
4. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

1. Make your changes in your feature branch
2. Write or update tests as needed
3. Run tests locally to ensure everything passes:
   ```bash
   pnpm test:e2e
   pnpm test
   ```
4. Build the project to verify your changes:
   ```bash
   pnpm build
   ```

## Submitting Changes

1. Commit your changes using clear and descriptive commit messages
2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Open a Pull Request (PR) against the `main` branch
4. Ensure your PR description clearly describes the changes and their motivation
5. Link any related issues

### Pull Request Guidelines

- PRs should focus on a single feature or bug fix
- Include tests for new functionality
- Update documentation as needed
- Ensure all tests pass and the build succeeds
- Follow the existing code style
- Keep commits atomic and well-documented

## Style Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing project structure
- Use meaningful variable and function names
- Comment complex logic
- Keep functions focused and small

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Start with a capital letter
- Limit the first line to 72 characters
- Reference issues and PRs in the body when relevant

## Adding New Icons

1. Create a new SVG file in the appropriate directory
2. Follow the existing icon structure:

   ```svelte
   <script lang="ts">
     // Add your props here
   </script>

   <svg>
     <!-- Icon content -->
   </svg>
   ```

3. Ensure the icon is optimized and follows accessibility guidelines
4. Add tests for the new icon
5. Update the documentation to include the new icon

### Icon Requirements

- Must be responsive to size prop
- Should support color customization
- Include proper ARIA attributes
- Support animation properties
- Include TypeScript types

## Testing

- Write tests for new features using the existing test framework
- Ensure tests are meaningful and cover edge cases
- Run the full test suite before submitting:
  ```bash
  pnpm test
  ```

## Documentation

- Update the README.md for new features or changes
- Include JSDoc comments for new functions and components
- Add usage examples for new functionality
- Keep the documentation clear and concise

## Questions and Discussions

- Use GitHub Discussions for general questions
- Open an issue for bugs or feature requests
- Join our community chat for real-time discussions

## License

By contributing to Svelte Animated Icons, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Svelte Animated Icons! Your efforts help make this project better for everyone.
