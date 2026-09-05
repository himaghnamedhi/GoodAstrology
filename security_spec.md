# Security Specification: Match Finder Data Rules

## 1. Data Invariants
- **Collection**: `/matchSubmissions/{matchId}`
- **Immutability**: Match records are permanent snapshots once written; updates are prohibited (`allow update: if false`).
- **24-Hour Expiration (TTL)**: Every submission must have `createdAt` equal to `request.time` and `expiresAt` set to exactly 24 hours in the future (`request.time + duration.value(24, 'h')`).
- **Read Guard**: No record can be read or queried after its `expiresAt` timestamp has passed (`resource.data.expiresAt > request.time`).
- **Strict Key Schema**: Only designated keys (`id`, `partner1`, `partner2`, `ashtakootaScore`, `maximumScore`, `compatibilityVerdict`, `createdAt`, `expiresAt`, `sessionId`) are allowed on creation.
- **Payload Boundary Limits**: String lengths for names, places, and verdicts are bounded; coordinates and Guna scores must adhere to numerical physical ranges.

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Ghost Field Injection**: Adding an unapproved administrative or tracking field (e.g. `isAdmin: true` or `verified: true`) on creation.
2. **Backdated/Manipulated Timestamp**: Setting `createdAt` to a fabricated past or future timestamp instead of `request.time`.
3. **Eternal Record Bypass**: Setting `expiresAt` to 10 years in the future to evade the 24-hour retention ceiling.
4. **Negative or Inflated Guna Milan Score**: Setting `ashtakootaScore` to -5 or 99 when Vedic Ashtakoota max is 36.
5. **Excessive String Length (Denial of Wallet)**: Setting `partner1.name` to a 500KB junk string to exhaust database storage.
6. **Path Traversal / ID Poisoning**: Using path characters `/`, `..`, or control characters in `matchId`.
7. **Invalid Latitude/Longitude**: Submitting `latitude: 999` or `longitude: -400`.
8. **Invalid Gender**: Submitting a non-conforming gender string outside of `['male', 'female', 'other']`.
9. **Tampering / Post-Creation Update**: Attempting to alter partner details or compatibility score after document creation.
10. **Expired Document Snooping**: Attempting to read a document whose `expiresAt` has already lapsed.
11. **Blanket Query Scraping**: Attempting an unrestricted `matchSubmissions` collection query without matching session scope.
12. **Non-Numeric / Corrupted Time Structure**: Submitting non-string/corrupted AM/PM indicators or malformed hour values.
