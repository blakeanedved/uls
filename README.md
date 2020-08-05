# uls.app

This is an extremely simple ad-free and paywall-free URL shortening service, that includes a REST api! Visit [uls.app](https://uls.app/) to get started or look at the api reference below.
**Links are permanent for the time being, but in the future they will likely have a limited lifetime.**

## Api Reference

To create a new link, make a `POST` request to `https://uls.app/createNewLink` with the following parameters
Option|Required?|Description
---|---|---
`url`|yes|The url to shorten
`suffix`|no*|The suffix of the shortened url (`uls.app/suffix`)
`autoSuffix`|no*|Auto generate a suffix
`length`|no|Length of the automatically generated suffix (default: 4)

\*Only required if the other is not present

#### Response

The response from the api will have the following fields
Field|Value|Other
---|---|---
`status`|`successful` or `error`|always present
`url`|The shortened url|Only present if `status == successful`
`error`|An error message|Only present if `status == error`

---

And thats all! It's that simple.
