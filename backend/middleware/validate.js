// ------------------------------------------------------------------
// Lightweight Validation Middleware Factory
// ------------------------------------------------------------------

/**
 * Built-in rule runners.  Each returns `{ valid, message? }`.
 *
 * Supported rules:
 *   required   — value must be truthy (after trim for strings)
 *   string     — typeof value must be 'string'
 *   number     — value must be a finite number
 *   email      — basic email regex check
 *   minLength  — string length >= n
 *   maxLength  — string length <= n
 *   min        — number >= n
 *   max        — number <= n
 *   enum       — value must be one of the allowed values
 *   objectId   — 24-char hex string (MongoDB ObjectId)
 *   url        — basic URL format check
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OBJECT_ID_RE = /^[a-fA-F0-9]{24}$/;
const URL_RE = /^https?:\/\/.+/i;

const ruleRunners = {
  required(value) {
    if (value === undefined || value === null || value === '') return { valid: false, message: 'This field is required' };
    if (typeof value === 'string' && value.trim() === '') return { valid: false, message: 'This field is required' };
    return { valid: true };
  },

  string(value) {
    if (value !== undefined && value !== null && typeof value !== 'string') {
      return { valid: false, message: 'Must be a string' };
    }
    return { valid: true };
  },

  number(value) {
    if (value !== undefined && value !== null && (typeof value !== 'number' || !Number.isFinite(value))) {
      return { valid: false, message: 'Must be a number' };
    }
    return { valid: true };
  },

  email(value) {
    if (value !== undefined && value !== null && !EMAIL_RE.test(value)) {
      return { valid: false, message: 'Must be a valid email address' };
    }
    return { valid: true };
  },

  minLength(value, n) {
    if (typeof value === 'string' && value.length < n) {
      return { valid: false, message: `Must be at least ${n} characters` };
    }
    return { valid: true };
  },

  maxLength(value, n) {
    if (typeof value === 'string' && value.length > n) {
      return { valid: false, message: `Must be no more than ${n} characters` };
    }
    return { valid: true };
  },

  min(value, n) {
    if (typeof value === 'number' && value < n) {
      return { valid: false, message: `Must be at least ${n}` };
    }
    return { valid: true };
  },

  max(value, n) {
    if (typeof value === 'number' && value > n) {
      return { valid: false, message: `Must be no more than ${n}` };
    }
    return { valid: true };
  },

  enum(value, allowed) {
    if (value !== undefined && value !== null && !Array.isArray(allowed).includes(value)) {
      return { valid: false, message: `Must be one of: ${allowed.join(', ')}` };
    }
    return { valid: true };
  },

  objectId(value) {
    if (value !== undefined && value !== null && !OBJECT_ID_RE.test(value)) {
      return { valid: false, message: 'Must be a valid 24-character ObjectId' };
    }
    return { valid: true };
  },

  url(value) {
    if (value !== undefined && value !== null && !URL_RE.test(value)) {
      return { valid: false, message: 'Must be a valid URL' };
    }
    return { valid: true };
  },
};

/**
 * validate(schema) — middleware factory.
 *
 * Schema shape:
 * {
 *   body:   { fieldName: [ruleName, ruleArg, ...], ... },
 *   params: { ... },
 *   query:  { ... },
 * }
 *
 * Each field's value is an array where the first element is the rule
 * name and any subsequent elements are arguments to that rule.
 * Multiple rule entries are applied in order.
 *
 * Example:
 * validate({
 *   body: {
 *     email: ['required', 'email'],
 *     password: ['required', 'string', 'minLength', 8],
 *   },
 * })
 */
function validate(schema) {
  return (req, res, next) => {
    const errors = [];

    const sources = [
      { data: req.body, rules: schema.body, label: 'body' },
      { data: req.params, rules: schema.params, label: 'params' },
      { data: req.query, rules: schema.query, label: 'query' },
    ];

    for (const { data, rules, label } of sources) {
      if (!rules || typeof rules !== 'object') continue;

      for (const [field, fieldRules] of Object.entries(rules)) {
        if (!Array.isArray(fieldRules)) continue;

        const value = data && data[field] !== undefined ? data[field] : undefined;

        // fieldRules is a flat array: ['required', 'string', 'minLength', 8, 'maxLength', 100]
        // We walk it in pairs — rule name then optional arg
        let i = 0;
        while (i < fieldRules.length) {
          const ruleName = fieldRules[i];
          const ruleArg = fieldRules[i + 1];

          const runner = ruleRunners[ruleName];
          if (runner) {
            // If the next item is NOT a known rule name, treat it as the argument
            let arg;
            if (ruleArg !== undefined && !ruleRunners[ruleArg]) {
              arg = ruleArg;
              i += 2;
            } else {
              arg = undefined;
              i += 1;
            }

            const result = runner(value, arg);
            if (!result.valid) {
              errors.push({
                source: label,
                field,
                message: result.message,
              });
              break; // one error per field is enough
            }
          } else {
            i += 1; // skip unknown rule names
          }
        }
      }
    }

    if (errors.length > 0) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    next();
  };
}

module.exports = validate;
