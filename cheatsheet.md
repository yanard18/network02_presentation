# HackTheBox and TryHackMe Referral

- https://referral.hackthebox.com/mzKZtw3
- https://tryhackme.com

# Tools

- Netcat
- Nmap
- Wireshark

# Nmap

```bash
# service and script scan
sudo nmap -sC -sV $IP

# all ports
sudo nmap -p- $IP

# udp scan
sudo nmap -sU $IP

# save output
sudo nmap $IP -oN out.nmap
```

Network Enumeration with Nmap - cheatsheet.pdf

```bash
sudo nmap -sC -sV $IP
```

Specific port scan

```bash
sudo nmap -


# FTP

https://academy.hackthebox.com/app/module/116/section/1165

# SNMP

https://academy.hackthebox.com/app/module/112/section/1075

# ARP Poisoning

https://tryhackme.com/room/layer2
