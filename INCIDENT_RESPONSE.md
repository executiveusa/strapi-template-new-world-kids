# Incident Response Playbook
**New World Kids Platform - Youth Safety & Security**

---

## 🎯 Quick Reference

| Severity | Response Time | Examples | Action |
|----------|---------------|----------|--------|
| **P0 Critical** | <5 min | Data breach, youth safety threat | Immediate escalation |
| **P1 High** | <30 min | Service down, payment system broken | Alert team |
| **P2 Medium** | <2 hrs | Performance issue, minor bug | Create ticket |
| **P3 Low** | Next day | Minor UI issue | Schedule fix |

---

## 🚨 P0: CRITICAL INCIDENTS

### **Scenario 1: Data Breach (Youth PII Exposed)**

**Detection Triggers:**
- Security tool detects unusual data access patterns
- External researcher reports vulnerability
- Anomalous database queries

**Response (Timeline):**

| Time | Action | Owner |
|------|--------|-------|
| **T+0 min** | Page incident commander (on-call) | Alert system |
| **T+2 min** | Take affected systems offline | Engineering lead |
| **T+5 min** | Create incident war room (Slack + Zoom) | Incident commander |
| **T+10 min** | Brief CEO, Legal, Board chair | Executive sponsor |
| **T+15 min** | Assess scope: which data? how many youth? | Database team |
| **T+30 min** | Start forensic analysis | Security team |
| **T+1 hr** | Notify state attorney general (law required) | Legal |
| **T+2 hrs** | Draft parent notification letter | Communications |
| **T+4 hrs** | Send notifications if >500 youth affected | Legal/Communications |
| **T+24 hrs** | Complete forensic analysis | Security |
| **T+3 days** | Implement fixes | Engineering |
| **T+7 days** | Final assessment & report | Incident commander |

**Parent Notification Template:**

```
Subject: Security Incident - Action Needed

Dear [Parent Name],

We are writing to inform you of a security incident affecting New World Kids that may have impacted your child's information.

WHAT HAPPENED:
[Describe incident in plain language - no jargon]

WHAT DATA WAS AFFECTED:
[List specific data types: first name, age range, etc.]

WHAT WE'RE DOING:
1. We have secured our systems
2. We are investigating how this happened
3. We are notifying law enforcement
4. We are implementing additional security measures

WHAT YOU SHOULD DO:
1. Monitor your child's accounts for unusual activity
2. Change passwords on any shared accounts
3. Watch for suspicious emails/calls
4. Contact us if you have concerns

CREDIT MONITORING:
[If SSN exposed] We are providing 3 years of free credit monitoring via [service].

QUESTIONS?
Call: [phone]
Email: privacy@newworldkids.org

We sincerely apologize for this incident and are committed to preventing it from happening again.

Sincerely,
[Executive Name]
New World Kids
```

---

### **Scenario 2: Youth Safety Incident (Harm/Abuse Report)**

**Detection Triggers:**
- Youth reports abuse in messaging
- Parent reports concerning behavior
- Staff observes red flags

**Response (Immediate):**

| Action | Timeline | Owner |
|--------|----------|-------|
| Document everything (do not alter) | NOW | Recipient |
| Call police if imminent danger | NOW | Anyone present |
| Notify safeguarding officer | <1 min | Recipient |
| Create incident ticket (non-public) | <5 min | Safeguarding officer |
| Brief CEO/Board | <15 min | Safeguarding officer |
| Preserve all evidence | <1 hr | IT/Security |
| Cooperate with authorities | Ongoing | Legal/Safeguarding |
| Support affected youth | Ongoing | Safeguarding/Counselor |

**Do NOT:**
- Contact the alleged perpetrator
- Investigate yourself
- Delete any messages/evidence
- Promise confidentiality you can't keep
- Delay reporting to authorities

**Mandatory Reporting States:**
These states require immediate reporting to authorities for child abuse:

```
All 50 states require reporting of child abuse.
Some require disclosure to parents first.

BEFORE interacting with families:
1. Consult state-specific mandatory reporting law
2. Contact Legal immediately
3. Follow state requirements to the letter
```

**Support Resources:**
- Counselor hotline: [phone]
- Crisis team contact: [email]
- Safeguarding manual: [link]

---

### **Scenario 3: Service Outage (Platform Down >30 mins)**

**Detection:**
- Uptime monitor alerts
- Users report "site not loading"

**Response:**

```bash
# T+0 mins: Alert team
1. Page on-call engineer
2. Slack alert: "🚨 CRITICAL: Platform is down"

# T+2 mins: Assess
1. Is database responsive? curl api.newworldkids.org/api/health
2. Are services running? railway status
3. Is it network/DNS? Check upstream provider

# T+5 mins: Communicate
- Update status page: statuspage.newworldkids.org
- Tweet: "We're experiencing technical difficulties"
- Email to key users (if outage >15 mins)

# T+15 mins: Mitigate
- Scale up servers if load issue
- Restart services if stuck
- Rollback last deployment if new code caused it
- Switch to failover service if available

# T+30 mins: Post-mortem
- Document what happened
- Schedule post-mortem meeting
- Identify prevention measures
```

---

## 🔴 P1: HIGH PRIORITY INCIDENTS

### **Service Degradation (Slow Performance)**

**If platform is responding but slow:**
1. Alert team with urgency
2. Check database performance
3. Check API latency
4. Monitor error rates
5. Update status page
6. Implement temporary fix (caching, throttling)
7. Root cause analysis after stabilized

### **Payment System Broken**

**If users can't donate:**
1. Alert financial/payment team immediately
2. Contact Stripe support
3. Switch to backup payment processor if available
4. Update donation page: "Temporarily accepting bank transfers"
5. Don't lose donations - manually process when fixed
6. Root cause analysis

---

## ✅ PREVENTION MEASURES

### **Daily**
- Monitor uptime dashboard
- Review Sentry alerts
- Check database query performance
- Review security logs

### **Weekly**
- Security scan (automated)
- Backup verification
- Incident review (if any)
- Team standup on security posture

### **Monthly**
- Disaster recovery drill
- Penetration test review
- Access control audit
- Update runbooks based on incidents

### **Quarterly**
- Full backup restoration test
- Incident response tabletop exercise
- Security assessment
- Performance optimization review

---

## 📋 INCIDENT COMMUNICATION TEMPLATE

### **Initial Alert (within 5 minutes)**

```
🚨 INCIDENT: [Service name]
Severity: P0/P1/P2
Start time: [time]
Status: INVESTIGATING
Lead: [name]
```

### **Updates (every 15 mins for P0, 30 mins for P1)**

```
UPDATE [#1]: We're working on the issue. Current status:
- Diagnosis: [what we know]
- Impact: [number of users affected]
- ETA: [estimated fix time]
```

### **Resolution**

```
RESOLVED: [Service] is back to normal as of [time]
Root cause: [brief description]
Duration: [total time down]
Post-mortem: Scheduled for [date] at [time]
```

---

## 👥 ON-CALL ROTATION

### **Weekly Schedule**
- Monday-Friday: Lead Engineer (primary) + Senior Tech (backup)
- Weekends: Senior Tech (primary) + On-call volunteer (backup)
- After-hours (10pm-8am): Response goal <15 mins

### **Contact Chain**
1. Slack alert in #incidents
2. Page primary via PagerDuty
3. If no response in 5 mins, page backup
4. If no response after 10 mins, page manager

### **Incident Commander Rotation**
- Week 1: Engineering Lead
- Week 2: Product Manager
- Week 3: Tech Lead
- Week 4: Operations Manager

---

## 📞 EMERGENCY CONTACTS

| Role | Name | Phone | Slack |
|------|------|-------|-------|
| CEO | [name] | [phone] | @ceo |
| CTO | [name] | [phone] | @cto |
| Security Lead | [name] | [phone] | @security |
| Safeguarding Officer | [name] | [phone] | @safeguarding |
| Legal | [name] | [phone] | @legal |

---

## 🛡️ SECURITY INCIDENT CHECKLIST

When handling security incidents, ensure:

- [ ] No public discussion of vulnerability until patched
- [ ] Document all actions (for legal discovery)
- [ ] Preserve evidence (logs, screenshots, etc.)
- [ ] Don't speak to media without PR approval
- [ ] Follow state breach notification laws
- [ ] Notify cyber insurance provider
- [ ] Consider mandatory disclosure timelines

---

## 📊 POST-INCIDENT REVIEW TEMPLATE

**Meeting Date:** [date]
**Incident:** [description]
**Duration:** [start] - [end]

### What Happened?
[Narrative of incident]

### What Went Well?
- [response speed]
- [communication clarity]
- [technical fix]

### What Could Be Better?
- [monitoring gap]
- [process improvement]
- [documentation]

### Action Items
| Action | Owner | Due |
|--------|-------|-----|
| [implement fix] | [name] | [date] |
| [update monitoring] | [name] | [date] |
| [update runbook] | [name] | [date] |

---

**Last Updated:** 2026-03-12
**Next Review:** 2026-04-12

