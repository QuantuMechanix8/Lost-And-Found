# Code Styleguide:


## Naming conventions:

- Stick to American spellings, since programming languages and their libraries use these as standard.
- Avoid abbreviations unless they are incredibly obvious e.g. `rand_arr, num_dict` are fine - otherwise they necessitate context that can make reading the code much harder
- Try to keep function names shorter by putting some of the info into the type signature e.g. Instead of `submit_bid(maximum)` we could just have `submit(maximum::bid)` just ensure it is still sufficiently self describing
    - For languages without types or cases where this is difficult, we can embed type info in the variable name i.e. `execute(delay_seconds)` instead of `execute(delay)` is far clearer what the input represents
- append `!` to functions which modify their arguments i.e `sort!(arr)` modifies the input array whereas `sort(arr)` returns a new sorted array


### Casing:
Generally `snake_case` is the preferred as the words appear the most separated (closest to actual spaces), followed by `kebab-case` and then the others (Prefer the consistency of `PascalCase` over `camelCase)`

- Variables should use `snake_case` although sometimes it is permissible to omit the underscore, when word separation is not visually needed (use judgement) e.g. `isequal` is fine without `_` separator
    - Constants & globals - only used when _absolutely necessary_ - are to written using `ALL_CAPS` snake case
- functions should also use `snake_case`
- modules should use `PascalCase`
- File names should use `snake_case` 
- Folders should use `kebab-case` (to match repository convention in `GitHub/GitLab`)


---


## General:
- Try to stick to 92 char line limit - not necessarily a hard limit but still - for readability especially on split or smaller (such as laptop) screens
- Standard indentation of 4 spaces, spaces around operators, separate functions with 2 blank lines, sparing line separation all as defined in [Pep8](https://peps.python.org/pep-0008/#blank-lines)
- Don't overuse try-catch blocks, it is better to avoid errors than rely on catching them


### Imports:
- All imports are to be at the top of a file, with each import on their own line (as in [Pep8](https://peps.python.org/pep-0008/#imports))
- Avoid importing the module into the local namespace i.e. `Import *` in python or `using` in Julia, instead call functions from the module name as it makes code much clearer, reduces namespace clutter and reduces need for context.


### Comments:
- As far as possible, avoid the need to comment with idiomatic code and **documentation** (prefer documentation over comments)
- Typically comments should describe what the code is achieving at a high level rather than how it is doing it
- Add links to comments when applicable - if code or an algorithm is borrowed from some where, or inspired by etc link that page
- Inlines are great but should only be used when they can coexist with the line limit, otherwise comment the line _above_ the code it references


### Documentation:
- Document all functions/classes with a simple explanatory docstring of what it does - use imperative "do this", "return that" rather than "returns the ..."
- For more complex functions/classes you can include:
    - a signature in documentation e.g. `in_mandel(c::Complex, iterations::Int)::Bool`
    - Examples e.g. `extrema([1,2,3,4]) -> (1,4)`
    - Longer description of how it works (high level)