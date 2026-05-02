# DNS Cutover Packet

Paste-ready DNS records for `masterchostaekwondo.com`.

Use this during cutover after changing GoDaddy nameservers to:

```txt
ns1.vercel-dns.com
ns2.vercel-dns.com
```

Vercel currently requires the nameserver switch before Vercel DNS record management is enabled, so these records should be added immediately after Vercel DNS becomes manageable.

## Vercel Hosting

| Type | Name | Value | Priority | TTL |
|---|---|---|---|---|
| A | @ | 216.198.79.1 | n/a | Default / 300 if editable |
| CNAME | www | Use the value Vercel shows for the redirect domain | n/a | Default / 300 if editable |

## Google Verification

| Type | Name | Value | Priority | TTL |
|---|---|---|---|---|
| TXT | @ | google-site-verification=88zBDQ9BPN_83ITavC8-Yvu9QI-PVokGg3Vkcu_GxJ8 | n/a | Default / 300 if editable |
| TXT | @ | google-site-verification=rvIpjicemCbIMNiNm8rXYxghLwzSTQrvjAiW_YqHaOY | n/a | Default / 300 if editable |

## Google MX Records

These preserve domain-email receiving for `@masterchostaekwondo.com`. They do not change contact-form delivery to `tkdkscho@gmail.com`.

| Type | Name | Value | Priority | TTL |
|---|---|---|---|---|
| MX | @ | aspmx.l.google.com | 1 | Default / 300 if editable |
| MX | @ | alt1.aspmx.l.google.com | 5 | Default / 300 if editable |
| MX | @ | alt2.aspmx.l.google.com | 5 | Default / 300 if editable |
| MX | @ | alt3.aspmx.l.google.com | 10 | Default / 300 if editable |
| MX | @ | alt4.aspmx.l.google.com | 10 | Default / 300 if editable |

## Resend Records

| Type | Name | Value | Priority | TTL |
|---|---|---|---|---|
| MX | send | feedback-smtp.us-east-1.amazonses.com | 10 | Default / 300 if editable |
| TXT | resend._domainkey | p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0lyASj1AK36a/ANaC515duTniFZK9EzYlLUtF0sbPsa7P5e3GF8JPU4vN62hJwvOibUS9voZMxCkIWiyQ3/0f2CNBhxvAJHNIvj1c9BoOQn8OXPpy1EIW2bsM2bV0cEix09bYZQc+SOkToP5z41DuOxLw4E/bJAcJUFclbYGfgwIDAQAB | n/a | Default / 300 if editable |
| TXT | send | v=spf1 include:amazonses.com ~all | n/a | Default / 300 if editable |
| TXT | _dmarc | v=DMARC1; p=none; | n/a | Default / 300 if editable |

## Clerk Records

| Type | Name | Value | Priority | TTL |
|---|---|---|---|---|
| CNAME | clerk | frontend-api.clerk.services | n/a | Default / 300 if editable |
| CNAME | accounts | accounts.clerk.services | n/a | Default / 300 if editable |
| CNAME | clkmail | mail.d0jds5iwiawl.clerk.services | n/a | Default / 300 if editable |
| CNAME | clk._domainkey | dkim1.d0jds5iwiawl.clerk.services | n/a | Default / 300 if editable |
| CNAME | clk2._domainkey | dkim2.d0jds5iwiawl.clerk.services | n/a | Default / 300 if editable |

## Verification Commands

Run these after adding records:

```bash
dig masterchostaekwondo.com NS +short
dig masterchostaekwondo.com A +short
dig www.masterchostaekwondo.com CNAME +short
dig masterchostaekwondo.com MX +short
dig masterchostaekwondo.com TXT +short
dig clerk.masterchostaekwondo.com CNAME +short
dig accounts.masterchostaekwondo.com CNAME +short
```
