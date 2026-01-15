# 📊 DONOR TRACKING SYSTEM
## Spreadsheet Templates and Tracking Protocols

---

## MASTER DONOR TRACKER

### Google Sheets Structure

**Sheet 1: All Donations**

| Column | Description | Example |
|--------|-------------|---------|
| A: Date | Donation date | 12/3/2025 |
| B: Donor Name | Full name | Jane Smith |
| C: Email | Contact email | jane@email.com |
| D: Phone | Contact phone | 206-555-1234 |
| E: Amount | Gift amount | $250 |
| F: Payment Method | How they gave | Online / Check / Venmo |
| G: Campaign | Which campaign | Giving Tuesday |
| H: Source | How they found us | Personal Ask / Email / Social |
| I: Matching Eligible | Yes/No | Yes - Microsoft |
| J: Match Submitted | Date submitted | 12/10/2025 |
| K: Match Received | Date/amount received | $500 on 1/15/26 |
| L: Thank You Sent | Date sent | 12/4/2025 |
| M: Gift Level | Tier | Garden Builder |
| N: Notes | Additional info | Met at Rotary, interested in volunteering |

---

**Sheet 2: Prospect Pipeline**

| Column | Description | Example |
|--------|-------------|---------|
| A: Name | Prospect name | John Doe |
| B: Company | Employer | Microsoft |
| C: Relationship | How you know them | College friend |
| D: Contact Info | Email/Phone | john@email.com |
| E: Estimated Capacity | What they might give | $500-$1000 |
| F: Matching Potential | Company match | 2:1 up to $15K |
| G: Status | Pipeline stage | Contacted |
| H: Last Contact | Date of last outreach | 12/8/2025 |
| I: Next Action | What's next | Follow-up call 12/12 |
| J: Ask Amount | What you'll ask for | $500 |
| K: Notes | Context/history | Loves gardening, has kids |

**Pipeline Stages:**
1. Identified - Name added to list
2. Researched - Background gathered
3. Contacted - Initial outreach made
4. Responded - They replied
5. Meeting Set - Call/coffee scheduled
6. Asked - Made the ask
7. Considering - They're thinking
8. Committed - Said yes, pending gift
9. Donated - Gift received
10. Declined - Said no (note reason)
11. Not Now - Maybe later

---

**Sheet 3: Campaign Dashboard**

### Key Metrics (Auto-calculate with formulas)

| Metric | Formula | Current |
|--------|---------|---------|
| Total Raised | =SUM(Donations!E:E) | $ |
| Goal | 25000 | $25,000 |
| % of Goal | =Total/Goal | % |
| Gap | =Goal-Total | $ |
| Days Remaining | =EndDate-TODAY() | days |
| Daily Target | =Gap/DaysRemaining | $/day |
| Number of Donors | =COUNTA(Donations!B:B)-1 | # |
| Average Gift | =Total/Donors | $ |
| Matching Pending | =SUMIF(Match Submitted<>"", Amount) | $ |
| Matching Received | =SUM(Match Received) | $ |

### By Source

| Source | # Gifts | Total | Avg Gift |
|--------|---------|-------|----------|
| Personal Ask | | | |
| Email | | | |
| Social Media | | | |
| Giving Tuesday | | | |
| Corporate Match | | | |
| Other | | | |

### By Gift Level

| Level | Range | # Donors | Total |
|-------|-------|----------|-------|
| Seed Planter | $25-$99 | | |
| Garden Builder | $100-$499 | | |
| Future Maker | $500+ | | |

---

**Sheet 4: Outreach Log**

| Date | Contact | Method | Purpose | Outcome | Next Step |
|------|---------|--------|---------|---------|-----------|
| 12/5 | Jane Smith | Phone | Ask for donation | Said yes, will give $200 | Send link |
| 12/5 | John Doe | Email | Corporate matching | No response | Follow up 12/8 |
| 12/6 | Sarah Lee | Text | Initial outreach | Wants more info | Send one-pager |

---

**Sheet 5: Weekly Summary**

| Week | Start Date | End Date | New Donors | Amount Raised | Running Total | % of Goal |
|------|------------|----------|------------|---------------|---------------|-----------|
| 1 | Nov 25 | Dec 1 | | | | |
| 2 | Dec 2 | Dec 8 | | | | |
| 3 | Dec 9 | Dec 15 | | | | |
| 4 | Dec 16 | Dec 22 | | | | |
| 5 | Dec 23 | Dec 29 | | | | |
| 6 | Dec 30 | Jan 5 | | | | |
| 7 | Jan 6 | Jan 12 | | | | |
| 8 | Jan 13 | Jan 19 | | | | |
| 9 | Jan 20 | Jan 26 | | | | |
| 10 | Jan 27 | Jan 31 | | | | |

---

## DAILY TRACKING ROUTINE

### Morning (5 min)
1. Check donation platform for overnight gifts
2. Update spreadsheet with new donations
3. Send thank-you emails for gifts received
4. Review today's follow-up tasks

### Evening (10 min)
1. Log all outreach attempts
2. Update prospect statuses
3. Schedule tomorrow's follow-ups
4. Update campaign dashboard totals
5. Celebrate any wins (seriously)

---

## WEEKLY TRACKING ROUTINE

### Weekly Review (30 min - Sunday evening or Monday morning)

**Numbers Review:**
- [ ] Total raised this week: $___
- [ ] Number of new donors: ___
- [ ] Average gift this week: $___
- [ ] Running total: $___
- [ ] % of goal: ___%
- [ ] Gap remaining: $___
- [ ] Daily target for next week: $___

**Activity Review:**
- [ ] Outreach attempts made: ___
- [ ] Conversations had: ___
- [ ] Asks made: ___
- [ ] Gifts received: ___
- [ ] Conversion rate: ___%

**Pipeline Review:**
- [ ] New prospects identified: ___
- [ ] Prospects moved to "Asked": ___
- [ ] Prospects moved to "Donated": ___
- [ ] Stale prospects (no contact in 7+ days): ___

**Content Review:**
- [ ] Emails sent: ___
- [ ] Email open rate: ___%
- [ ] Social posts: ___
- [ ] Social engagement: ___

**Planning:**
- [ ] Top 5 priorities for next week:
  1. ___
  2. ___
  3. ___
  4. ___
  5. ___

---

## CORPORATE MATCHING TRACKER

| Donor | Company | Gift Date | Gift Amount | Match Ratio | Match Amount | Submit Date | Status | Received Date | Total Impact |
|-------|---------|-----------|-------------|-------------|--------------|-------------|--------|---------------|--------------|
| | Microsoft | | | 2:1 | | | Pending | | |
| | Amazon | | | 1:1 | | | Pending | | |
| | Google | | | 1:1 | | | Pending | | |

**Match Status Options:**
- Not Submitted
- Submitted - Pending
- Approved
- Received
- Denied (note reason)

---

## GIFT ACKNOWLEDGMENT TRACKER

| Donor | Gift Date | Amount | Thank You Email | Thank You Note | Thank You Call | Receipt Sent | Added to List |
|-------|-----------|--------|-----------------|----------------|----------------|--------------|---------------|
| | | | ✓ 12/4 | ✓ 12/6 | | ✓ 12/4 | ✓ |

**Rules:**
- Thank You Email: Within 48 hours (required for all)
- Thank You Note: Within 7 days (for gifts $500+)
- Thank You Call: Within 7 days (for gifts $1,000+)
- Receipt: Within 48 hours (required for all)

---

## SAMPLE GOOGLE SHEETS FORMULAS

### Total Raised
```
=SUM(E2:E)
```

### Number of Donors
```
=COUNTA(B2:B)
```

### Average Gift
```
=AVERAGE(E2:E)
```

### Days Remaining
```
=DATE(2026,1,31)-TODAY()
```

### Daily Target Needed
```
=(25000-SUM(E2:E))/(DATE(2026,1,31)-TODAY())
```

### Count by Source
```
=COUNTIF(H2:H,"Personal Ask")
```

### Sum by Source
```
=SUMIF(H2:H,"Personal Ask",E2:E)
```

### Percent of Goal
```
=SUM(E2:E)/25000
```

### Conditional Formatting for Thank Yous
```
Highlight red if Thank You Email is blank AND Gift Date is >2 days ago
```

---

## SIMPLE VERSION (If Spreadsheets Overwhelm You)

### Minimum Viable Tracking

**Daily Log (Notebook or Simple Doc):**

```
DATE: ___________

DONATIONS TODAY:
- Name: _____ Amount: $_____ Source: _____
- Name: _____ Amount: $_____ Source: _____

OUTREACH TODAY:
- Called: _____ Result: _____
- Texted: _____ Result: _____
- Emailed: _____ Result: _____

RUNNING TOTAL: $_____
GOAL: $25,000
GAP: $_____

TOMORROW'S TOP 3:
1. _____
2. _____
3. _____
```

---

## REPORTING TEMPLATES

### Quick Update (For Board/Fiscal Sponsor)

```
NEW WORLD KIDS CAMPAIGN UPDATE
Date: _____

PROGRESS:
- Raised: $_____ (___% of $25,000 goal)
- Donors: _____
- Matching Pending: $_____

ACTIVITY THIS WEEK:
- [Key activity 1]
- [Key activity 2]
- [Key activity 3]

NEXT WEEK FOCUS:
- [Priority 1]
- [Priority 2]

CONCERNS/NEEDS:
- [Any blockers or help needed]
```

### Social Proof Update (For Social Media)

```
📊 CAMPAIGN UPDATE

$_____ raised of $25,000 goal
_____ generous donors
_____ days to go

Every dollar gets us closer to launching our pilot program in February.

[DONATE LINK]

#NewWorldKids #FoodForest #YouthEducation
```

---

## TOOLS RECOMMENDATIONS

### Free Options
- **Google Sheets** - Full tracking (recommended)
- **Notion** - If you prefer databases
- **Airtable** - More visual, free tier available
- **Paper notebook** - If digital overwhelms you

### Paid Options (Future)
- **HubSpot CRM** - Free tier, great for donor management
- **Bloomerang** - Nonprofit-specific, starts ~$99/mo
- **Little Green Light** - Affordable, ~$45/mo
- **Salesforce Nonprofit** - 10 free licenses for nonprofits

### What You Actually Need Right Now
1. Google Sheet with the templates above
2. Consistency in updating daily
3. Weekly review ritual

Don't overthink the tools. A simple spreadsheet updated consistently beats a fancy CRM ignored.
