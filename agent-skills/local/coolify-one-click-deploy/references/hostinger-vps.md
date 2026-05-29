# Hostinger VPS Notes

Use the VPS only for host/runtime duties:

- confirm SSH reachability before deploying
- confirm the app health URL from the server side when possible
- keep private keys off the app env payload
- treat network or firewall failures as a blocker, not a silent success

If the VPS is unreachable:

1. verify the hostname/IP
2. verify the SSH user and key path
3. verify the server has the required port/proxy path open
4. stop and ask for the missing access method if none of the above works
