# Stream D — Academic evidence on VC, startup survival/scalability, and Turkish survival statistics

Compiled 2026-09-18 for the IB Business Management EE: "To what extent does the increasing concentration of venture capital funding in Türkiye influence the scalability and survival rates of early-stage startups?"

## 0. VERIFICATION METHOD AND LIMITS — READ FIRST

**Verification was by web-search excerpts, because page fetches were blocked.** Every direct fetch (curl and WebFetch) was denied by the organisation's network egress policy (HTTP 403 on CONNECT) for doi.org, Crossref/OpenAlex/Semantic Scholar APIs, Wiley, OUP, ScienceDirect, AEA, NBER, SSRN, JSTOR, Springer, Taylor & Francis, RePEc, arXiv, Wikipedia, and every Turkish source (TÜİK, HMB, Turcorn, Invest Office, AA, DergiPark) and data vendor (CB Insights, Carta). Per the proxy README, blocks were not routed around.

Each paper was therefore checked with the WebSearch tool: the exact title plus journal name was searched, and the returned **result titles and URL path metadata** (e.g. the Wiley page title "… - PURI - 2012 - The Journal of Finance - Wiley Online Library", the RePEc handle "v67y2012i6p2247-2293", the DOI embedded in a publisher URL, SSRN/NBER page titles with author names) were used as the confirming excerpts. Abstract text was captured as rendered by the search tool from the indexed page. The session-wide search budget (200 calls, shared with the other research streams) was exhausted after this stream's 36th call, before Part 2 (Eurostat/OECD Türkiye tables, BiGG, KOSGEB, KPMG/Endeavor, Ministry technopark counts), the Turkish academic follow-ups, and Part 3 (Crunchbase/PitchBook/Dealroom/AngelList) could be run. Those items are marked NOT VERIFIED.

**Labels used (per coordinator instruction), applied separately to bibliographic details and to the key finding:**
- **verified by 2+ independent excerpts** = at least two result excerpts from *different hosts* (e.g. publisher page title + RePEc/EconPapers handle + SSRN/NBER page) agree on title, authors, journal, year and (where present) volume/pages/DOI.
- **single-source excerpt** = confirmed by one excerpt only, or (for key findings) by the abstract text as rendered by the search tool, which cannot be attributed to a specific result URL. Numbers that appeared only in the tool's synthesised summary and not in a result title/URL are flagged "(summary-only)".
- **NOT VERIFIED** = not confirmed in this session; anything labelled "(recollection — verify)" is my memory of the paper and must be checked before citing.
- DOI tags: "[DOI seen in result URL/excerpt]" vs "[DOI derived from Elsevier PII in result URL]" (mechanical: legacy Elsevier DOIs = 10.1016/ + PII) vs "[DOI from memory — check]".

Nothing below is invented; where the evidence stops, the entry says so.

---

## PART 1 — Theory and international evidence

### 1. Puri & Zarutskie (2012) — life cycle of VC vs non-VC firms (US)
- **Reference:** Puri, M. and Zarutskie, R. (2012) 'On the Life Cycle Dynamics of Venture-Capital- and Non-Venture-Capital-Financed Firms', *The Journal of Finance*, 67(6), pp. 2247–2293.
- **DOI/URL:** 10.1111/j.1540-6261.2012.01786.x [DOI seen in result URL] — https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.2012.01786.x ; https://ideas.repec.org/a/bla/jfinan/v67y2012i6p2247-2293.html ; NBER WP 14250 https://www.nber.org/papers/w14250
- **Evidence excerpts:** Wiley result title "On the Life Cycle Dynamics of Venture-Capital- and Non-Venture-Capital-Financed Firms - PURI - 2012 - The Journal of Finance - Wiley Online Library"; RePEc handle bla/jfinan v67 y2012 i6 p2247-2293; NBER page "On the Lifecycle Dynamics of Venture-Capital- and Non-Venture-Capital-Financed Firms | NBER" (w14250); Duke Scholars record.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered).
- **Sample and method:** US Census Bureau firm-level data linked to VC-financing records over 25 years; VC-financed firms vs matched non-VC-financed firms (age, industry, size, etc.) followed through survival, growth, and exit.
- **Exact key finding (abstract as rendered):** "We use data over 25 years to understand the life cycle dynamics of VC- and non-VC-financed firms. Successful and failed VC-financed firms achieve larger scale but are not more profitable at exit than matched non-VC-financed firms. Cumulative failure rates of VC-financed firms are lower, with the difference driven largely by lower failure rates in the initial years after receiving VC. The results are not driven by VCs disguising failures as acquisitions or by certain types of VCs, and the performance difference between VC- and non-VC-financed firms narrows in the post-internet bubble years, but does not disappear."
- **Mechanism supported:** Runway/scale (early-years survival advantage; larger scale) and cycles (advantage narrows post-bubble). Not profitability.
- **Reliability / transfer to Türkiye:** Top-3 finance journal; near-universal census coverage; matching not causal. The early-years survival advantage is a runway effect that should transfer; the scale effect depends on follow-on capital, which is thin in Türkiye beyond seed (Part 2.4).

### 2. Chemmanur, Krishnan & Nandy (2011) — screening vs monitoring, TFP (US)
- **Reference:** Chemmanur, T.J., Krishnan, K. and Nandy, D.K. (2011) 'How Does Venture Capital Financing Improve Efficiency in Private Firms? A Look Beneath the Surface', *The Review of Financial Studies*, 24(12), pp. 4037–4090.
- **DOI/URL:** 10.1093/rfs/hhr096 [DOI from memory — check] — https://academic.oup.com/rfs/article-abstract/24/12/4037/1573269 ; SSRN https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1025322 ; Census WP https://ideas.repec.org/p/cen/wpaper/08-16.html
- **Evidence excerpts:** OUP result title "How Does Venture Capital Financing Improve Efficiency in Private Firms? A Look Beneath the Surface | The Review of Financial Studies | Oxford Academic" with URL path rfs/article-abstract/24/12/4037; SSRN title "… by Thomas J. Chemmanur, Karthik Krishnan, Debarshi K. Nandy :: SSRN"; SCIRP reference string "Chemmanur, T. J., Krishnan, K., & Nandy, D. K. (2011)… The Review of Financial Studies, 24, 4037-4090"; Semantic Scholar entry.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered).
- **Sample and method:** US Census Longitudinal Research Database (manufacturing plants); VC-backed vs non-VC-backed private firms; TFP before and after financing; split by VC reputation.
- **Exact key finding (abstract as rendered):** examines "whether VC backing improves the total factor productivity (TFP) of private firms, and whether certain kinds of VCs (higher reputation versus lower reputation) are better at generating such efficiency gains"; "The total factor productivity (TFP) of firms prior to VC financing is lower for higher reputation VC-backed firms, but the increase in TFP subsequent to financing is significantly higher for these firms, consistent with higher reputation VCs having greater monitoring ability"; "The efficiency gains from VC backing arise primarily from improvement in product market performance (sales); however for higher reputation VCs, additional efficiency gains arise from both improved sales and reductions in input costs."
- **Mechanism supported:** Selection (screening) and treatment (monitoring), with investor quality mattering.
- **Reliability / transfer:** Top journal; manufacturing only. Supports the EE point that concentration of capital in a few *reputable* investors could raise treatment effects even while narrowing access.

### 3. Hellmann & Puri (2000) — VC and time to market
- **Reference:** Hellmann, T. and Puri, M. (2000) 'The Interaction between Product Market and Financing Strategy: The Role of Venture Capital', *The Review of Financial Studies*, 13(4), pp. 959–984.
- **DOI/URL:** 10.1093/rfs/13.4.959 [DOI from memory — check] — https://academic.oup.com/rfs/article-abstract/13/4/959/1586347 ; https://ideas.repec.org/a/oup/rfinst/v13y2000i4p959-84.html ; SSRN 173655.
- **Evidence excerpts:** OUP title "Interaction between Product Market and Financing Strategy: The Role of Venture Capital | The Review of Financial Studies | Oxford Academic" (path 13/4/959); RePEc handle oup/rfinst v13 y2000 i4 p959-84; SSRN title "… by Thomas F. Hellmann, Manju Puri :: SSRN"; SCIRP string "Review of Financial Studies, Vol. 13, 2000, pp. 959-984".
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt.
- **Sample and method:** Hand-collected Silicon Valley high-tech start-up database (survey/interviews); duration analysis of time to product launch.
- **Exact key finding (as rendered):** "innovator firms are more likely to obtain venture capital than imitator firms… Venture capital is also associated with a significant reduction in the time to bring a product to market, especially for innovators."
- **Mechanism supported:** Treatment (speed to market) and selection (innovators into VC).
- **Reliability / transfer:** Small single-region sample; associational. Generic mechanism, transferable.

### 4. Hellmann & Puri (2002) — professionalization
- **Reference:** Hellmann, T. and Puri, M. (2002) 'Venture Capital and the Professionalization of Start-Up Firms: Empirical Evidence', *The Journal of Finance*, 57(1), pp. 169–197.
- **DOI/URL:** 10.1111/1540-6261.00419 [DOI seen in result URL] — https://onlinelibrary.wiley.com/doi/abs/10.1111/1540-6261.00419 ; https://ideas.repec.org/a/bla/jfinan/v57y2002i1p169-197.html ; SSRN 243149.
- **Evidence excerpts:** Wiley title "Venture Capital and the Professionalization of Start-Up Firms: Empirical Evidence - Hellmann - 2002 - The Journal of Finance - Wiley Online Library"; RePEc handle v57 y2002 i1 p169-197; SSRN "… by Thomas F. Hellmann, Manju Puri"; SCIRP "The Journal of Finance, 57, 169-197".
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered).
- **Sample and method:** Same hand-collected Silicon Valley dataset; VC-backed vs non-VC-backed firms on HR/organisational milestones and founder-CEO replacement.
- **Exact key finding (abstract as rendered):** "we find that venture capital is related to a variety of professionalization measures, such as human resource policies, the adoption of stock option plans, and the hiring of a marketing VP. Venture-capital-backed companies are also more likely and faster to replace the founder with an outside CEO, both in situations that appear adversarial and those mutually agreed to. The evidence suggests that venture capitalists play roles over and beyond those of traditional financial intermediaries."
- **Mechanism supported:** Professionalization.
- **Reliability / transfer:** Foundational but small and correlational. In Türkiye the professionalization channel may be weaker where investors are passive (tax-motivated angels, public grants).

### 5. Sørensen (2007) — sorting vs influence
- **Reference:** Sørensen, M. (2007) 'How Smart Is Smart Money? A Two-Sided Matching Model of Venture Capital', *The Journal of Finance*, 62(6), pp. 2725–2762.
- **DOI/URL:** 10.1111/j.1540-6261.2007.01291.x [DOI seen in result URL] — https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1540-6261.2007.01291.x ; https://econpapers.repec.org/RePEc:bla:jfinan:v:62:y:2007:i:6:p:2725-2762 ; SSRN 878692.
- **Evidence excerpts:** Wiley title "How Smart Is Smart Money? A Two-Sided Matching Model of Venture Capital - SØRENSEN - 2007 - The Journal of Finance"; EconPapers handle v:62 y:2007 i:6 p:2725-2762; SSRN "… by Morten Sorensen"; scite.ai report; Wharton 2004 seminar PDF.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered).
- **Sample and method:** US VC investments; structural two-sided matching model identifying "influence" (treatment) separately from "sorting" (selection) using other market participants' characteristics.
- **Exact key finding (abstract as rendered):** "Companies funded by more experienced VCs are more likely to go public. This follows both from the direct influence of more experienced VCs and from sorting in the market, which leads experienced VCs to invest in better companies… Both effects are found to be significant, with sorting almost twice as important as influence for the difference in IPO rates."
- **Mechanism supported:** Selection ≈ two-thirds, treatment ≈ one-third of the experienced-VC IPO advantage.
- **Reliability / transfer:** Cleanest selection/treatment separation in the literature; US only. Implies that when capital concentrates in a few Turkish investors who can cherry-pick, observed "VC-backed firms do better" gaps will be largely selection.

### 6. Baum & Silverman (2004) — picking winners or building them (Canada, biotech)
- **Reference:** Baum, J.A.C. and Silverman, B.S. (2004) 'Picking winners or building them? Alliance, intellectual, and human capital as selection criteria in venture financing and performance of biotechnology startups', *Journal of Business Venturing*, 19(3), pp. 411–436.
- **DOI/URL:** 10.1016/S0883-9026(03)00038-7 [DOI derived from Elsevier PII S0883902603000387] — https://www.sciencedirect.com/science/article/abs/pii/S0883902603000387 ; https://ideas.repec.org/a/eee/jbvent/v19y2004i3p411-436.html ; https://econpapers.repec.org/RePEc:eee:jbvent:v:19:y:2004:i:3:p:411-436
- **Evidence excerpts:** RePEc citation string "Baum, Joel A. C. & Silverman, Brian S., 2004… Journal of Business Venturing, vol. 19(3), pages 411-436, May"; EconPapers handle; ScienceDirect title; Semantic Scholar entry.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered).
- **Sample and method:** Canadian biotechnology start-ups; effects of alliance, intellectual (patent) and human capital on VC financing decisions vs on subsequent performance.
- **Exact key finding (abstract as rendered):** "VCs affect selection both by acting as a 'scout' able to identify future potential and as a 'coach' that can help realize it… we find that startups' alliances and patents had broadly similar effects on both attracting VC investment and on subsequent startup performance. However, those top management team characteristics that attracted VC investment had little effect on subsequent performance of the startup."
- **Mechanism supported:** Selection (scout) and treatment (coach); VCs partly select on non-predictive team traits.
- **Reliability / transfer:** Single sector/country; conceptual framing useful for the EE.

### 7. Bernstein, Giroud & Townsend (2016) — VC monitoring (natural experiment)
- **Reference:** Bernstein, S., Giroud, X. and Townsend, R.R. (2016) 'The Impact of Venture Capital Monitoring', *The Journal of Finance*, 71(4), pp. 1591–1622.
- **DOI/URL:** 10.1111/jofi.12370 [DOI seen in result URL] — https://onlinelibrary.wiley.com/doi/abs/10.1111/jofi.12370 ; https://ideas.repec.org/a/bla/jfinan/v71y2016i4p1591-1622.html ; author PDF http://www.columbia.edu/~xg2285/VC.pdf
- **Evidence excerpts:** Wiley title "The Impact of Venture Capital Monitoring - BERNSTEIN - 2016 - The Journal of Finance"; RePEc handle v71 y2016 i4 p1591-1622; IWH Halle publication record; SCIRP "Bernstein, S., Giroud, X. and Townsend, R.R. (2016)… The Journal of Finance, 71".
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered).
- **Sample and method:** US VC-backed firms; difference-in-differences around new direct airline routes that reduce VC travel time to existing portfolio companies; outcomes: patents/citations, successful exit; VC survey.
- **Exact key finding (abstract as rendered):** "venture capitalists' on-site involvement with their portfolio companies leads to an increase in both innovation and the likelihood of a successful exit. We rule out selection effects by exploiting an exogenous source of variation in VC involvement: the introduction of new airline routes that reduce VCs' travel times to their existing portfolio companies… almost 90% of VCs surveyed indicate that direct flights increase their interaction with their portfolio companies and management."
- **Mechanism supported:** Monitoring/treatment (causal).
- **Reliability / transfer:** Strong identification. Turkish VC is Istanbul-concentrated, so monitoring intensity is plausibly lower for Anatolian start-ups.

### 8. Kortum & Lerner (2000) — VC and patenting (US)
- **Reference:** Kortum, S. and Lerner, J. (2000) 'Assessing the Contribution of Venture Capital to Innovation', *RAND Journal of Economics*, 31(4), pp. 674–692.
- **DOI/URL:** 10.2307/2696354 [DOI seen in SCIRP reference excerpt] — https://econpapers.repec.org/RePEc:rje:randje:v:31:y:2000:i:winter:p:674-692 ; NBER WP 6846 ("Does Venture Capital Spur Innovation?") https://www.nber.org/papers/w6846 ; SSRN 1512328.
- **Evidence excerpts:** EconPapers handle rje/randje v:31 y:2000 i:winter p:674-692; SCIRP "Kortum, S. and Lerner, J. (2000)… RAND Journal of Economics, 31, 674-692… doi10.2307/2696354"; SSRN "… by Samuel S. Kortum, Josh Lerner"; NBER w6846 page.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt; magnitudes NOT VERIFIED.
- **Sample and method:** US, 20 industries, three decades; industry panel of VC disbursements, R&D and patents; instrument: 1979 ERISA "prudent man" rule change that boosted VC fundraising.
- **Exact key finding (as rendered):** "examines the influence of venture capital on patented inventions in the United States across twenty industries over three decades… address concerns about causality by exploiting a 1979 policy shift that spurred venture capital fundraising… increases in venture capital activity in an industry are associated with significantly higher patenting rates." (Recollection — verify: VC under 3% of corporate R&D but ~8% of industrial innovations 1983–1992.)
- **Mechanism supported:** Treatment on innovation (industry level).
- **Reliability / transfer:** Seminal; industry-level; weak transfer to Türkiye where start-up patenting is low.

### 9. Davila, Foster & Gupta (2003) — VC and employee growth
- **Reference:** Davila, A., Foster, G. and Gupta, M. (2003) 'Venture capital financing and the growth of startup firms', *Journal of Business Venturing*, 18(6), pp. 689–708.
- **DOI/URL:** 10.1016/S0883-9026(02)00127-1 [DOI derived from Elsevier PII S0883902602001271] — https://www.sciencedirect.com/science/article/abs/pii/S0883902602001271 ; https://ideas.repec.org/a/eee/jbvent/v18y2003i6p689-708.html ; Stanford GSB WP page https://www.gsb.stanford.edu/faculty-research/working-papers/venture-capital-financing-growth-startup-firms
- **Evidence excerpts:** RePEc handle v18 y2003 i6 p689-708; WashU profile "Davila A, Foster G, Gupta M… Journal of Business Venturing. 2003 Nov;18(6):689-708"; EconBiz record; SCIRP "18, 689-708"; Google Scholar lookup string with volume 18, pages 689-708.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered); magnitudes NOT VERIFIED.
- **Sample and method:** Silicon Valley start-ups with monthly headcount data; event analysis of employee growth around VC funding rounds; signalling framework.
- **Exact key finding (abstract as rendered):** "examines the association between the presence of venture capital (VC) and the employee growth of startups. Grounded in signaling theory, it investigates the impact, if any, of VC financing events upon the growth of these companies and whether the amount of funding affects the intensity of the signal. It further explores whether VC leads to growth or, alternatively, whether growth signals the need for VC. Finally, it documents the relationship between growth in startup financial valuation and changes in the number of employees over successive rounds of financing." A citing summary states the paper "demonstrated the positive influence of venture capital on startup employment growth" (summary-only).
- **Mechanism supported:** Runway (hiring) and signalling.
- **Reliability / transfer:** Good journal; small regional sample; directly relevant to "scalability" as headcount growth.

### 10. Megginson & Weiss (1991) — certification hypothesis
- **Reference:** Megginson, W.L. and Weiss, K.A. (1991) 'Venture Capitalist Certification in Initial Public Offerings', *The Journal of Finance*, 46(3), pp. 879–903.
- **DOI/URL:** 10.1111/j.1540-6261.1991.tb03770.x [DOI seen in result URL] — https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1540-6261.1991.tb03770.x ; SSRN https://www.ssrn.com/abstract=1505883 ; Lehigh course PDF https://business.lehigh.edu/sites/default/files/2019-08/8%20megginson_weiss_1991_jf.pdf
- **Evidence excerpts:** Wiley title "Venture Capitalist Certification in Initial Public Offerings - MEGGINSON - 1991 - The Journal of Finance"; SSRN "… by William L. Megginson, Kathleen A. Weiss"; Lehigh file name "megginson_weiss_1991_jf". Volume 46 / pages 879-903 appeared only in the rendered summary (summary-only).
- **Label — bibliographic:** verified by 2+ independent excerpts (title/authors/journal/year); volume/pages single-source. **Label — key finding:** single-source excerpt.
- **Sample and method:** US IPOs 1983–1987; VC-backed IPOs matched by industry and offering size with non-VC-backed IPOs.
- **Exact key finding (as rendered):** VC backing "results in significantly lower initial returns and gross spreads"; VC presence "serves to lower the total costs of going public and to maximize the net proceeds to the offering firm."
- **Mechanism supported:** Signalling/certification.
- **Reliability / transfer:** Classic; logic transfers to Turkish follow-on rounds/BIST IPOs but untested there.

### 11. Amit, Brander & Zott (1998) — information asymmetry (Canada)
- **Reference:** Amit, R., Brander, J. and Zott, C. (1998) 'Why do venture capital firms exist? Theory and Canadian evidence', *Journal of Business Venturing*, 13(6), pp. 441–466.
- **DOI/URL:** 10.1016/S0883-9026(97)00061-X [DOI derived from Elsevier PII S088390269700061X] — https://www.sciencedirect.com/science/article/abs/pii/S088390269700061X ; https://econpapers.repec.org/RePEc:eee:jbvent:v:13:y:1998:i:6:p:441-466
- **Evidence excerpts:** EconPapers handle v:13 y:1998 i:6 p:441-466; ScienceDirect title; Semantic Scholar "WHY DO VENTURE CAPITAL FIRMS EXIST? THEORY AND CANADIAN EVIDENCE" (Amit, Brander); SCIRP "Journal of Business Venturing, Vol. 13, 1998, pp. 441-466"; Google Scholar lookup string.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt.
- **Sample and method:** Theory plus Canadian VC industry data.
- **Exact key finding (as rendered):** VC firms "exist because they fill a market niche by developing the ability to overcome extreme information asymmetry embedded in high-risk entrepreneurial firms"; both "hidden information" (adverse selection) and "hidden action" (moral hazard) analysed; VCs' raison d'être is reducing the cost of informational asymmetries.
- **Mechanism supported:** Screening and monitoring as responses to information asymmetry.

### 12. Sahlman (1990) — structure and governance of VC (staging)
- **Reference:** Sahlman, W.A. (1990) 'The structure and governance of venture-capital organizations', *Journal of Financial Economics*, 27(2), pp. 473–521.
- **DOI/URL:** 10.1016/0304-405X(90)90065-8 [DOI seen in SCIRP reference excerpt] — https://www.sciencedirect.com/science/article/abs/pii/0304405X90900658 ; https://ideas.repec.org/a/eee/jfinec/v27y1990i2p473-521.html ; HBS record https://www.hbs.edu/faculty/Pages/item.aspx?num=14758 ; SSRN 1505891.
- **Evidence excerpts:** RePEc handle v27 y1990 i2 p473-521; SCIRP "Journal of Financial Economics, Vol. 27, No. 2, 1990, pp. 473-521. doi10.1016/0304-405X(90)90065-8"; HBS faculty page; SSRN "… by William Sahlman"; scispace "(1990) | William A. Sahlman".
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt.
- **Sample and method:** Descriptive/analytical study of US VC organisations and contracts.
- **Exact key finding (as rendered):** "describes and analyzes the structure of venture-capital organizations, focusing on the relationship between investors and venture capitalists and between venture-capital firms and the ventures in which they invest"; emphasis on "the agency problems in these organizations and the contracts and operating procedures that have evolved in response"; VC firms "invest at reasonably well-defined stages in high risk firms"; about two-thirds are limited partnerships.
- **Mechanism supported:** Staged financing/governance (option to abandon).
- **Reliability / transfer:** Canonical; explains why a thin follow-on market can kill viable firms at the next stage gate.

### 13. Gompers, Gornall, Kaplan & Strebulaev (2020) — how VCs decide
- **Reference:** Gompers, P.A., Gornall, W., Kaplan, S.N. and Strebulaev, I.A. (2020) 'How do venture capitalists make decisions?', *Journal of Financial Economics*, 135(1), pp. 169–190.
- **DOI/URL:** 10.1016/j.jfineco.2019.06.011 [DOI from memory — check] — https://ideas.repec.org/a/eee/jfinec/v135y2020i1p169-190.html ; https://econpapers.repec.org/RePEc:eee:jfinec:v:135:y:2020:i:1:p:169-190 ; SSRN 2801385; NBER WP 22587; Stanford GSB record.
- **Evidence excerpts:** RePEc and EconPapers handles v135 y2020 i1 p169-190; SSRN "… by Paul A. Gompers, Will Gornall, Steven N. Kaplan, Ilya A. Strebulaev"; NBER "WORKING PAPER SERIES HOW DO VENTURE CAPITALISTS MAKE DECISIONS?" (w22587); Harvard corpgov blog post (2019).
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (survey size and team finding as rendered).
- **Sample and method:** Survey of 885 institutional VCs at 681 firms across eight areas (deal sourcing, investment decisions, valuation, deal structure, post-investment value-added, exits, internal organisation, LP relations).
- **Exact key finding (as rendered):** "In selecting investments, VCs see the management team as more important than business related characteristics such as product or technology. They also attribute more of the likelihood of ultimate investment success or failure to the team than to the business." (Recollection — verify: deal selection ranked as the most important source of value creation, ahead of deal flow and post-investment value-add.)
- **Mechanism supported:** Selection (team-based picking), secondarily treatment.
- **Reliability / transfer:** Large but self-reported; questions can be replicated with Turkish VCs in the EE's primary research.

### 14. Lerner & Nanda (2020) — VC concentration and its limits
- **Reference:** Lerner, J. and Nanda, R. (2020) 'Venture Capital's Role in Financing Innovation: What We Know and How Much We Still Need to Learn', *Journal of Economic Perspectives*, 34(3), pp. 237–261.
- **DOI/URL:** 10.1257/jep.34.3.237 [DOI seen in result URL] — https://www.aeaweb.org/articles?id=10.1257/jep.34.3.237 ; NBER WP 27492 https://www.nber.org/papers/w27492 ; JSTOR https://www.jstor.org/stable/26923549 ; SSRN 3633054; HBS record.
- **Evidence excerpts:** AEA result title "…What We Know and How Much We Still Need to Learn - American Economic Association" with DOI in URL; NBER w27492 page; JSTOR stable 26923549; SSRN "… by Josh Lerner, Ramana Nanda"; Harvard DASH record; openICPSR data deposit.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered).
- **Sample and method:** Review article with descriptive statistics on the US VC industry.
- **Exact key finding (abstract as rendered):** "venture capital financing also has real limitations in its ability to advance substantial technological change. Three issues are particularly concerning to us: 1) the very narrow band of technological innovations that fit the requirements of institutional venture capital investors; 2) the relatively small number of venture capital investors who hold and shape the direction of a substantial fraction of capital that is deployed into financing radical technological change; and 3) the relaxation in recent years of the intense emphasis on corporate governance by venture capital firms."
- **Mechanism supported:** Concentration (sector, geography, investor) as a structural limit; governance erosion.
- **Reliability / transfer:** Authoritative review; the closest academic anchor for the EE's "concentration" construct.

### 15. Nanda & Rhodes-Kropf (2013) — hot markets, failure and innovation
- **Reference:** Nanda, R. and Rhodes-Kropf, M. (2013) 'Investment cycles and startup innovation', *Journal of Financial Economics*, 110(2), pp. 403–418.
- **DOI/URL:** 10.1016/j.jfineco.2013.07.001 [DOI from memory — check] — https://www.sciencedirect.com/science/article/abs/pii/S0304405X13001967 ; https://ideas.repec.org/a/eee/jfinec/v110y2013i2p403-418.html ; SSRN 1950581; HBS record https://www.hbs.edu/faculty/Pages/item.aspx?num=45656
- **Evidence excerpts:** RePEc handle v110 y2013 i2 p403-418; ScienceDirect title; SSRN "… by Ramana Nanda, Matthew Rhodes-Kropf"; conference PDF file name "Nanda_Rhodes_Kroff_JFE_2013_Investment_Cycles_and_Start_up_Innovation.pdf"; HBS record.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered).
- **Sample and method:** US VC-backed start-ups by year of first financing; bankruptcy, IPO valuation, patents/citations across hot vs cold VC markets.
- **Exact key finding (as rendered):** "VC-backed firms receiving their initial investment in hot markets are more likely to go bankrupt, but conditional on going public are valued higher on the day of their IPO, have more patents and have more citations to their patents… VCs invest in riskier and more innovative startups in hot markets (rather than just worse firms)… The flood of capital in hot markets plays a causal role in shifting investments to more novel startups by lowering the cost of experimentation."
- **Mechanism supported:** Cycles — abundance raises failure but funds radical innovation.
- **Reliability / transfer:** Top journal; Türkiye's 2021–22 spike and 2023–25 contraction is a natural hot/cold case.

### 16. Howell, Lerner, Nanda & Townsend (2020) — VC in recessions (NBER WP)
- **Reference:** Howell, S.T., Lerner, J., Nanda, R. and Townsend, R.R. (2020) 'How Resilient is Venture-Backed Innovation? Evidence from Four Decades of U.S. Patenting', NBER Working Paper No. 27150. Cambridge, MA: National Bureau of Economic Research.
- **DOI/URL:** https://www.nber.org/papers/w27150 ; PDF https://www.nber.org/system/files/working_papers/w27150/w27150.pdf ; SSRN 3603780; EconPapers https://econpapers.repec.org/paper/nbrnberwo/27150.htm ; HBS record num=58126.
- **Evidence excerpts:** NBER page title with w27150; NBER PDF; SSRN "… by Sabrina T Howell, Josh Lerner, Ramana Nanda, Richard Townsend :: SSRN"; EconPapers nberwo 27150; HBS "Working Paper".
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered, verbatim).
- **Sample and method:** Four decades of US patents matched to VC-backed firms; VC-backed innovation vs whole economy over cycles.
- **Exact key finding (abstract as rendered):** "Despite theoretical predictions to the contrary, corporate innovation is strongly pro-cyclical. In this paper, we compare innovation in the economy as a whole to that of firms backed by venture capital (VC), a source of capital associated with the most impactful young firms. We show that (1) patents filed by VC-backed firms are of significantly higher quality and economic importance than those in the broader economy, (2) venture-backed innovation is even more procyclical than innovation in general, and (3) that the deterioration of venture innovation in downturns appears driven by shifts in the types of startups that these investors finance."
- **Mechanism supported:** Cycles; selection shifts in downturns.
- **Reliability / transfer:** Working paper (cite as such). Consistent with Turkish VCs retreating to fewer, larger deals in 2023–25.

### 17. Kerr, Lerner & Schoar (2014) — angel financing, survival and growth
- **Reference:** Kerr, W.R., Lerner, J. and Schoar, A. (2014) 'The Consequences of Entrepreneurial Finance: Evidence from Angel Financings', *The Review of Financial Studies*, 27(1), pp. 20–55.
- **DOI/URL:** 10.1093/rfs/hhr098 [DOI from memory — check] — https://academic.oup.com/rfs/article-abstract/27/1/20/1571221 ; HBS PDF https://www.hbs.edu/ris/download.aspx?name=Kerr_Lerner_Schoar+RFS14.pdf ; NBER WP 15831 (earlier title 'A Regression Discontinuity Analysis').
- **Evidence excerpts:** OUP title "Consequences of Entrepreneurial Finance: Evidence from Angel Financings | The Review of Financial Studies | Oxford Academic" (path 27/1/20); HBS file "Kerr_Lerner_Schoar RFS14.pdf"; NBER w15831 page; Semantic Scholar; ANDE record.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered).
- **Sample and method:** Ventures pitched to two prominent US angel groups; regression-discontinuity design using sharp jumps in funding probability around the angels' collective interest level.
- **Exact key finding (as rendered):** "ventures funded by two successful angel groups experience superior outcomes to rejected ventures: they have improved survival, exits, employment, patenting, web traffic, and financing… We use strong discontinuities in angel-funding behavior over small changes in their collective interest levels to implement a regression discontinuity approach"; at the discontinuity there are positive effects on operations and qualitative support for exits, "though there is no difference in access to additional financing around the discontinuity."
- **Mechanism supported:** Treatment (runway + angel involvement) on survival/growth; signalling to follow-on investors NOT supported.
- **Reliability / transfer:** Strong design; two elite groups. Highly relevant to Türkiye's BKY (licensed angel) system, though Turkish angels are less organised.

### 18. Hochberg, Ljungqvist & Lu (2007) — VC networks
- **Reference:** Hochberg, Y.V., Ljungqvist, A. and Lu, Y. (2007) 'Whom You Know Matters: Venture Capital Networks and Investment Performance', *The Journal of Finance*, 62(1), pp. 251–301.
- **DOI/URL:** 10.1111/j.1540-6261.2007.01207.x [DOI seen in result URL] — https://onlinelibrary.wiley.com/doi/full/10.1111/j.1540-6261.2007.01207.x ; https://ideas.repec.org/a/bla/jfinan/v62y2007i1p251-301.html ; EconPapers; ADS 2007JFin...62..251H.
- **Evidence excerpts:** Wiley title "Whom You Know Matters: Venture Capital Networks and Investment Performance - HOCHBERG - 2007 - The Journal of Finance"; RePEc/EconPapers handles v62 y2007 i1 p251-301; ADS bibcode; AFA clarification PDF (Table VI).
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered).
- **Sample and method:** US VC syndication networks (centrality) vs fund performance and portfolio-company outcomes.
- **Exact key finding (as rendered):** "better-networked VC firms experience significantly better fund performance, as measured by the proportion of investments that are successfully exited through an IPO or a sale to another company. Similarly, the portfolio companies of better-networked VCs are significantly more likely to survive to subsequent financing and eventual exit."
- **Mechanism supported:** Network access to follow-on rounds (treatment/signalling).
- **Reliability / transfer:** Top journal. In a concentrated ecosystem, a few central investors gate syndication — a concrete channel linking concentration to survival.

### 19. Gompers & Lerner (2000) — "money chasing deals"
- **Reference:** Gompers, P. and Lerner, J. (2000) 'Money chasing deals? The impact of fund inflows on private equity valuations', *Journal of Financial Economics*, 55(2), pp. 281–325.
- **DOI/URL:** 10.1016/S0304-405X(99)00052-5 [DOI derived from Elsevier PII S0304405X99000525] — https://www.sciencedirect.com/science/article/abs/pii/S0304405X99000525 ; https://ideas.repec.org/a/eee/jfinec/v55y2000i2p281-325.html ; SSRN 57964; HBS record num=2794.
- **Evidence excerpts:** RePEc string "Gompers, Paul & Lerner, Josh, 2000… Journal of Financial Economics, vol. 55(2), pages 281-325, February"; ScienceDirect title; SSRN "… by Paul A. Gompers, Josh Lerner"; HBS record.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered).
- **Sample and method:** US VC deal valuations vs inflows into venture funds; controls, first differences, LBO inflows.
- **Exact key finding (as rendered):** "Growth in venture capital commitments is shown to increase the valuation of new investments. This effect is robust to (i) the addition of controls for firm characteristics, public market valuations, and various alternative hypotheses, (ii) an examination of first differences, and (iii) the use of inflows into leveraged buyout funds… consistent with suggestions that competition for a limited number of good investments may be responsible for rising prices."
- **Mechanism supported:** Cycles/over-funding.

### 20. Gompers & Lerner — *The Venture Capital Cycle* (book)
- **Reference:** Gompers, P.A. and Lerner, J. (2004) *The Venture Capital Cycle*. 2nd edn. Cambridge, MA: MIT Press. ISBN 978-0-262-57238-5 (1st edn 1999, ISBN 978-0-262-07255-7).
- **URL:** https://mitpress.mit.edu/9780262072557/the-venture-capital-cycle/
- **Evidence excerpts:** MIT Press page; Amazon listings "The Venture Capital Cycle, second edition: 9780262572385: Gompers, Paul, Lerner, Josh" and "9780262072557"; Semantic Scholar "The Venture Capital Cycle, 2nd Edition"; Google Books.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — content:** single-source excerpt (publisher blurb as rendered).
- **Content (as rendered):** examines "the fund-raising, investing, and exit stages of venture capitalists"; themes: "venture investors confront tremendous information and incentive problems; venture capital processes are inherently interrelated… unlike most financial markets, the venture capital industry adjusts very slowly to shifts in the demand for and the supply of investment capital." Second edition "includes six new chapters".
- **Mechanism supported:** Cycles; information asymmetry.

### 21. Bertoni, Colombo & Grilli (2011) — Italy, treatment vs selection
- **Reference:** Bertoni, F., Colombo, M.G. and Grilli, L. (2011) 'Venture capital financing and the growth of high-tech start-ups: Disentangling treatment from selection effects', *Research Policy*, 40(7), pp. 1028–1043.
- **DOI/URL:** 10.1016/j.respol.2011.03.008 [DOI from memory — check] — https://www.sciencedirect.com/science/article/abs/pii/S0048733311000515 ; https://ideas.repec.org/a/eee/respol/v40y2011i7p1028-1043.html ; SSRN 1102233; author PDF http://www.colombomassimo.com/static/publications/Bertoni%20Colombo%20Grilli%202011%20RP.pdf
- **Evidence excerpts:** RePEc handle v40 y2011 i7 p1028-1043; SSRN "… by Fabio Bertoni, Massimo G. Colombo, Luca Grilli"; SCIRP "Research Policy, 40, 1028-1043"; ScienceDirect title; author-site PDF.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt for design; result magnitude NOT VERIFIED.
- **Sample and method (as rendered):** "10-year longitudinal data set for 538 Italian NTBFs, most of which are privately held, including both VC-backed and non-VC-backed firms… Gibrat-law-type dynamic panel-data models augmented with time-varying variables that capture the VC status of firms… several GMM estimators to control for the endogeneity of VC investments."
- **Key finding:** The abstract sets out to test whether "VC investments have a positive treatment effect on the growth of employment and sales of NTBFs". (Recollection — verify: a positive, significant treatment effect on both employment and sales growth, sales lagging; effect largely treatment rather than selection.)
- **Mechanism supported:** Treatment in a bank-based, thin-VC economy.
- **Reliability / transfer:** Italy is institutionally closer to Türkiye than the US.

### 22. Croce, Martí & Murtinu (2013) — Europe, screening vs value added
- **Reference:** Croce, A., Martí, J. and Murtinu, S. (2013) 'The impact of venture capital on the productivity growth of European entrepreneurial firms: "Screening" or "value added" effect?', *Journal of Business Venturing*, 28(4), pp. 489–510.
- **DOI/URL:** 10.1016/j.jbusvent.2012.06.001 [DOI seen in rendered excerpt] — https://www.sciencedirect.com/science/article/abs/pii/S0883902612000705 ; SSRN 1705225; Groningen portal; UCM Docta record.
- **Evidence excerpts:** SSRN "… by Annalisa Croce, José Martí, Samuele Murtinu :: SSRN"; ScienceDirect title; RUG research portal; SCIRP "Journal of Business Venturing, 28, 489-510"; UCM repository.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered).
- **Sample and method:** European VC-backed high-tech firms (VICO dataset) vs matched controls; productivity growth before/after first VC round.
- **Exact key finding (as rendered):** "Productivity growth is not significantly different between VC and non-VC-backed firms before the first round of VC financing, whereas significant differences are found in the first years after the investment event. The value-adding services provided by VC investors 'imprint' the portfolio firm."
- **Mechanism supported:** Treatment (value added), not screening, for productivity.

### 23. Engel & Keilbach (2007) — Germany
- **Reference:** Engel, D. and Keilbach, M. (2007) 'Firm-level implications of early stage venture capital investment — An empirical investigation', *Journal of Empirical Finance*, 14(2), pp. 150–167.
- **DOI/URL:** 10.1016/j.jempfin.2006.03.004 [DOI from memory — check] — https://www.sciencedirect.com/science/article/abs/pii/S0927539806000442 ; https://econpapers.repec.org/RePEc:eee:empfin:v:14:y:2007:i:2:p:150-167 ; MADOC Mannheim record.
- **Evidence excerpts:** EconPapers handle v:14 y:2007 i:2 p:150-167; ScienceDirect title; MADOC record; SCIRP "Journal of Empirical Finance, 14, 150-167".
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt.
- **Sample and method:** Young German firms, VC-funded vs matched controls; patents and growth.
- **Exact key finding (as rendered):** "venture-funded firms have a higher number of patent applications than those in the control group; however, these are obtained even before the venture capitalists' investment, hence venture capitalists choose firms with demonstrated innovative output. After investment, the number of firms' patents does not differ significantly anymore, however their growth rates are significantly larger."
- **Mechanism supported:** Selection (on innovativeness) + treatment (on growth).

### 24. Peneder (2010) — Austria
- **Reference:** Peneder, M. (2010) 'The impact of venture capital on innovation behaviour and firm growth', *Venture Capital: An International Journal of Entrepreneurial Finance*, 12(2), pp. 83–107.
- **DOI/URL:** 10.1080/13691061003643250 [DOI seen in result URL] — https://www.tandfonline.com/doi/abs/10.1080/13691061003643250 ; WIFO WP 363 https://ideas.repec.org/p/wfo/wpaper/y2010i363.html ; SSRN 964954.
- **Evidence excerpts:** T&F title "The impact of venture capital on innovation behaviour and firm growth: Venture Capital: Vol 12, No 2"; SSRN "… by Michael R. Peneder"; RePEc WIFO working-paper record; ResearchGate. Pages 83-107 appeared only in the rendered summary (summary-only).
- **Label — bibliographic:** verified by 2+ independent excerpts (pages single-source). **Label — key finding:** single-source excerpt.
- **Sample and method (as rendered):** "two-stage propensity score matching on Austrian micro-data".
- **Exact key finding (as rendered):** "(i) the financing function of venture capital, showing that recipients lacked access to satisfactory alternative sources of capital; (ii) selection effects, where venture capital is invested in firms with high performance potential; and (iii) the value adding function in terms of a genuine causal impact of venture capital on firm growth, yet not on innovation output."
- **Mechanism supported:** Runway (financing gap), selection, treatment on growth.
- **Reliability / transfer:** Small bank-based economy with thin VC — closest European analogue to Türkiye.

### 25. Manigart, Baeyens & Van Hyfte (2002) — Belgium, survival
- **Reference:** Manigart, S., Baeyens, K. and Van Hyfte, W. (2002) 'The survival of venture capital backed companies', *Venture Capital: An International Journal of Entrepreneurial Finance*, 4(2), pp. 103–124.
- **DOI/URL:** 10.1080/13691060110103233 [DOI seen in result URL] — https://www.tandfonline.com/doi/abs/10.1080/13691060110103233 ; https://ideas.repec.org/a/taf/veecee/v4y2002i2p103-124.html ; academia.edu copy.
- **Evidence excerpts:** T&F title "The survival of venture capital backed companies: Venture Capital: Vol 4, No 2"; RePEc handle taf/veecee v4 y2002 i2 p103-124; Ghent research explorer (Manigart publications); academia.edu.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt (abstract as rendered).
- **Sample and method (as rendered):** survival analysis of "565 Belgian VC backed companies and 565 comparable non-VC backed companies".
- **Exact key finding (as rendered):** "Contrary to common wisdom, VC backed companies do not have a higher probability of surviving than comparable non-VC backed companies. However, companies backed by the two oldest government venture capitalists have a higher survival rate, while companies backed by other government venture capitalists have a lower survival rate and a higher probability of going bankrupt."
- **Mechanism supported:** Null average survival effect; investor type/experience matters.
- **Reliability / transfer:** Directly about survival; the public-VC heterogeneity is highly relevant to Türkiye's public-money-heavy early stage.

### 26. Cumming, Grilli & Murtinu (2017) — governmental vs independent VC (Europe)
- **Reference:** Cumming, D.J., Grilli, L. and Murtinu, S. (2017) 'Governmental and independent venture capital investments in Europe: A firm-level performance analysis', *Journal of Corporate Finance*, 42, pp. 439–459.
- **DOI/URL:** 10.1016/j.jcorpfin.2014.10.016 [DOI seen in rendered excerpt] — https://www.sciencedirect.com/science/article/abs/pii/S0929119914001321 ; SSRN 2294746; Groningen portal.
- **Evidence excerpts:** SSRN "… by Douglas J. Cumming, Luca Grilli, Samuele Murtinu :: SSRN"; ScienceDirect title; RUG research portal; ResearchGate. Volume 42 / pages 439-459 appeared in the rendered summary (summary-only).
- **Label — bibliographic:** verified by 2+ independent excerpts (title/authors/journal); volume/pages single-source. **Label — key finding:** single-source excerpt.
- **Sample and method (as rendered):** VICO dataset of European VC-backed firms; exit performance by investor type.
- **Exact key finding (as rendered):** "private independent VC-backed companies have better exit performance than government-backed companies. Mixed-syndicates of private-independent and governmental VC investors give rise to a higher (but not statistically different) likelihood of positive exits than that of IVC-backing."
- **Mechanism supported:** Investor type; public–private syndication complementarity.

### 27. Lerner & Schoar (2005) — developing-country private equity
- **Reference:** Lerner, J. and Schoar, A. (2005) 'Does Legal Enforcement Affect Financial Transactions? The Contractual Channel in Private Equity', *The Quarterly Journal of Economics*, 120(1), pp. 223–246.
- **DOI/URL:** 10.1162/0033553053327443 [DOI from memory — check] — https://academic.oup.com/qje/article-abstract/120/1/223/1931457 ; MIT PDF http://web.mit.edu/aschoar/www/LDCPEDeals_rev6.pdf ; HBS record num=18152.
- **Evidence excerpts:** OUP title "Does Legal Enforcement Affect Financial Transactions? The Contractual Channel in Private Equity* | The Quarterly Journal of Economics | Oxford Academic" (path 120/1/223); HBS faculty record; MIT author PDF; ResearchGate.
- **Label — bibliographic:** verified by 2+ independent excerpts. **Label — key finding:** single-source excerpt.
- **Sample and method (as rendered):** "210 developing country private equity investments"; contract terms vs legal enforcement/legal origin.
- **Exact key finding (as rendered):** "Investments in high enforcement and common law nations often use convertible preferred stock with covenants, while in low enforcement and civil law nations, private equity groups tend to use common stock and debt, and rely on equity and board control. Transactions in high enforcement countries have higher valuations and returns."
- **Mechanism supported:** Institutions condition governance and returns.
- **Reliability / transfer:** Top-5 journal; Türkiye is civil-law with moderate enforcement.

### 28. Guo & Jiang (2013) — China
- **Reference:** Guo, D. and Jiang, K. (2013) 'Venture capital investment and the performance of entrepreneurial firms: Evidence from China', *Journal of Corporate Finance*, 22, pp. 375–395. (Author order: one rendered summary gave "Jiang, K., & Guo, D."; confirm on the publisher page.)
- **DOI/URL:** 10.1016/j.jcorpfin.2013.07.001 [DOI seen in rendered excerpt] — https://www.sciencedirect.com/science/article/abs/pii/S0929119913000588 ; Roehampton portal https://pure.roehampton.ac.uk/portal/en/publications/venture-capital-investment-and-the-performance-of-entrepreneurial
- **Evidence excerpts:** ScienceDirect title; Roehampton research-explorer title. Volume/pages appeared only in the rendered summary.
- **Label — bibliographic:** single-source excerpt (title confirmed on two hosts; volume/pages/author order summary-only). **Label — key finding:** single-source excerpt.
- **Exact key finding (as rendered):** "VC-backed firms outperform non-VC-backed firms in terms of profitability, labor productivity, sales growth, and R&D investment, with evidence suggesting that this outperformance is driven by both superior project selection and the ex-post monitoring efforts of VCs."
- **Mechanism supported:** Selection + monitoring in an emerging market.

### 29. Turkish academic sources (search hits; none could be opened; no follow-up searches possible)
- **29a.** 'Venture Capital and Business Angels: Turkish Case' — *Procedia – Social and Behavioral Sciences* (Elsevier), PII S1877042816315750, https://www.sciencedirect.com/science/article/pii/S1877042816315750 . Evidence excerpt: ScienceDirect result title only. **Label: single-source excerpt (title/outlet); authors, year, findings NOT VERIFIED.** Procedia = conference proceedings; background only.
- **29b.** 'The impact of firm characteristics and firm environment on survival of newly established SMEs: empirical evidence from Turkey' — *Journal of Entrepreneurship in Emerging Economies* (Emerald), DOI 10.1108/JEEE-07-2025-0412 [DOI seen in result URL], https://www.emerald.com/jeee/article-abstract/doi/10.1108/JEEE-07-2025-0412/1359444/ . Rendered excerpt: analyses "over 100,000 newly established SMEs operating between 2009 and 2020 using the Cox regression model" for firm-specific, regional and industry survival determinants. **Label: single-source excerpt; authors and results NOT VERIFIED.** Most relevant Turkish peer-reviewed survival study found; general SMEs, not VC-backed.
- **29c.** 'Employee age and experience as determinants of new-firm survival: evidence from Turkish matched employer–employee data' — *Small Business Economics*, DOI 10.1007/s11187-026-01256-x [DOI seen in result URL], https://link.springer.com/article/10.1007/s11187-026-01256-x . **Label: single-source excerpt (title/journal/DOI); authors, sample, results NOT VERIFIED.**
- **29d.** 'Machine Learning-Based Feature Selection Analysis of Academic Spin-Off Survival in Technoparks Located in Türkiye' — *Verimlilik Dergisi (Journal of Productivity)*, https://dergipark.org.tr/en/pub/verimlilik/article/1840976 . Rendered excerpt: "the number of ongoing projects emerged as the strongest predictor of ASO survival, reflecting the regulatory requirement for maintaining at least one active project… R&D expenditures, public R&D support, and incubation participation enhance firms' financial resilience and increase the likelihood of continued operation." **Label: single-source excerpt; authors/year/sample NOT VERIFIED.** Survival here = remaining in the TDZ (regulatory), not economic survival.
- **29e.** 'Examination of Startups Investments by Receiving the Most Investment Sectors: The Case of Turkish Startup Ecosystem' — *Bulletin of Accounting and Finance Reviews (MUFİDER)*, https://dergipark.org.tr/en/pub/mufider/article/1477483 . **Label: single-source excerpt (title); not a survival study.**
- **29f.** 'The Survival Rates of SMEs in Turkey and the Conceptual…' — IJCSRR (2021) PDF https://ijcsrr.org/wp-content/uploads/2021/10/17-18-2021.pdf . **NOT VERIFIED** (low-visibility outlet).
- **29g.** Wasti, S.A. et al. (2022) 'Social capital, information sharing, ambidexterity, and performance for technology park firms in Turkey', *Thunderbird International Business Review*, DOI 10.1002/tie.22305 [DOI seen in result URL]. **Label: single-source excerpt; performance not survival.**
- **29h.** TÜBİTAK BiGG (1512) grantee survival: **NOT VERIFIED** — query never ran (budget exhausted).
- **29i.** Turkish angel (BKY) empirical studies: **NOT VERIFIED** — query never ran. Legal/administrative sources surfaced (single-source excerpts): Treasury regulation PDF https://ms.hmb.gov.tr/uploads/2023/04/Bireysel-Katilim-Sermayesi-Hakkinda-Yonetmelik.pdf ; revised regulation (2025) reproduced at https://www.alomaliye.com/2024/12/31/bireysel-katilim-sermayesi-hakkinda-yonetmelik-2025/ ; Treasury FAQ https://www.hmb.gov.tr/finansal-bks-sss ; EY Türkiye guide https://www.ey.com/tr_tr/insights/tax/melek-yatirimci-olmanin-sartlari-ve-vergi-avantajlari . Legal basis Law No. 6327 (2012) adding the BKY deduction to the Income Tax Law (provisional Art. 82 — recollection, verify).
- **29j.** 'The Impact of Venture Capital on the Survival Rate of Startups: An Empirical Analysis Based on Industry Data' — *Frontiers in Business, Economics and Management* (drpress.org). **NOT VERIFIED; not Turkish; non-recognised outlet — do not cite.**

---

## PART 2 — Turkish survival statistics

### 2.1 TÜİK — Girişimcilik ve İş Demografisi (GENERAL ENTERPRISES, all sectors)
- **Sources:** TÜİK bulletin "Girişimcilik ve İş Demografisi, 2023", no. 53452: https://data.tuik.gov.tr/Bulten/Index?p=Girisimcilik-ve-Is-Demografisi-2023-53452 (result title confirmed). 2024 bulletin released 16 Dec 2025, reproduced/reported at https://www.alomaliye.com/2025/12/16/girisimcilik-ve-is-demografisi-2024/ , https://katilimanaliz.com/2025/12/17/turkiyede-gecen-yil-dogan-girisimlerin-istihdamdaki-payi-yuzde-49/ and https://www.turkelihaber.com/2024te-dogan-yeni-girisim-orani-yuzde-15-8-oldu-en-fazla-girisim-istanbulda-kuruldu/49017/ . TÜİK's own 2024 bulletin number not captured.
- **Evidence excerpts:** Alomaliye result title "Girişimcilik ve İş Demografisi - 2024"; Turkeli Haber result title "2024'te doğan yeni girişim oranı yüzde 15,8 oldu… En fazla girişim İstanbul'da kuruldu" (confirms 15.8% birth rate and Istanbul lead in a result title); Katılım Analiz result title "Türkiye'de geçen yıl doğan girişimlerin istihdamdaki payı yüzde 4,9" (confirms 4.9% employment share in a result title). Survival rates, death rate and high-growth shares appeared only in the rendered summary.
- **Labels:** birth rate 15.8% and employment share 4.9% — verified by 2+ independent excerpts (two news result titles + Alomaliye reproduction); one-year survival 78.3% (2023 cohort), one-year 75.2% and two-year 58.6% (2022 cohort), death rate 12.9% (2022), high-growth 14.4% and gazelles 2.4% (2024), Istanbul 25.8% — single-source excerpt (summary-only; verify on data.tuik.gov.tr). **3-, 4- and 5-year survival rates: NOT VERIFIED** (not captured; TÜİK bulletins normally publish them in the table "Yeni doğan girişimlerin hayatta kalma oranları").
- **Methodology:** Eurostat/OECD business-demography manual: births exclude entries by merger/break-up; survival = birth-cohort still active n years later. Covers ALL active enterprises (overwhelmingly micro firms) — NOT technology start-ups.
- **Use:** baseline for a matched comparison of VC-backed start-up survival.

### 2.2 OECD
- **Sources (result titles confirmed):** *Entrepreneurship at a Glance* series page https://www.oecd.org/en/publications/serials/entrepreneurship-at-a-glance_g1g1bbef.html and 2014/2016/2017 PDFs; OECD *Entrepreneurial Ecosystem Diagnostics* https://www.oecd.org/en/publications/entrepreneurial-ecosystem-diagnostics_7096961f-en.html (cross-country chapter: Türkiye among countries with strong enterprise birth rates "alongside Colombia, Estonia, and Korea" — single-source excerpt).
- **Türkiye survival values:** NOT VERIFIED (no Türkiye-specific survival rate captured). A general OECD-derived figure "average survival probability of new ventures in the fifth year was about 0.52" across 21 OECD countries (2005) came from a ResearchGate table — single-source, secondary.
- **Action:** OECD Data Explorer, "SDBS Business Demography Indicators (ISIC Rev.4)", survival rates 1–5 years — retrieve directly.

### 2.3 Eurostat — NOT VERIFIED (query never ran). Statistics Explained PDF surfaced but not opened: https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/42545.pdf .

### 2.4 Technology-startup-specific statistics (Türkiye)
- **Startups.watch, "Turkish Startup Ecosystem — Year in Review 2024"** (powered by 212): PDF https://www.turcorn.gov.tr/upload/Node/100093/files/Year_in_Review_2024_v1-1.pdf ; blog https://blog.startups.watch/turkish-startup-ecosystem-year-in-review-2024-f5328f274f9b (Serkan Ünsal). Evidence excerpts: both result titles confirmed ("Powered by 212 startups.watch TURKISH STARTUP ECOSYSTEM"; "Turkish Startup Ecosystem — Year in Review 2024 | by Serkan Ünsal"). Rendered figures (summary-only): "$1.1B were invested across 469 deals in seed, early and later vc stages"; deal size +44% and deal count +31% YoY; record 455 GSYF (VCIF) authorised, 440 net of closures; BiGG Fund 42 biotech / 32 healthtech / 27 AI investments in 2024; "Türkiye has a significantly weaker performance compared to other countries beyond the seed stage"; VCs name economic turmoil as the main problem. Daily Sabah result title independently confirms "$1.1B with 470 investment deals in 2024" (https://www.dailysabah.com/business/tech/turkish-startup-ecosystem-secures-11b-with-470-investment-deals-in-2024). **Label:** 2024 total (~$1.1B, ~470 deals) — verified by 2+ independent excerpts; other figures — single-source excerpt.
- **Startups.watch "Year in Review 2025"** PDF https://www.turcorn.gov.tr/upload/Node/100496/files/Year_in_Review_2025_v1-01.pdf — result title confirmed; content NOT VERIFIED.
- **H1 2025:** "$210 million across 90 funding rounds" vs "129 rounds and $470 million" in H2 2024 — İmran Gürakan, https://www.toplum.org.tr/en/2025s-first-half-turkiyes-entrepreneurship-ecosystem/ (and substack mirror) — single-source excerpt (secondary commentary).
- **Invest Office, "The State of Turkish Startup Ecosystem 2025"** https://agencyadm.invest.gov.tr/en/library/publications/lists/investpublications/the-state-of-turkish-startup-ecosystem-2025.pdf — result title confirmed; content NOT VERIFIED.
- **Closure / zombie / failure rates for Turkish start-ups:** NONE FOUND (rendered summary explicitly noted no such statistics in the Startups.watch results).
- **KPMG Türkiye, Endeavor Türkiye, Ministry TGB firm counts:** NOT VERIFIED (queries never ran).
- **Licensed angel investors (BKY):** AA article "Başlangıç aşamasındaki girişimlere 'melek yatırımcı' desteği 39,4 milyon lirayı buldu" https://www.aa.com.tr/tr/ekonomi/baslangic-asamasindaki-girisimlere-melek-yatirimci-destegi-39-4-milyon-lirayi-buldu/3307477 (result title confirmed: TRY 39.4 million angel support). Rendered figures (summary-only, internally inconsistent — verify against HMB quarterly BKS report): 1,143 licences since 2013 net of cancellations; 594 active; 158 issued in 2024, 48 in H1 2025; Istanbul 782 licence-holders; "98 investments by 264 angels totalling TRY 65.7 million" (conflicts with the TRY 39.4m headline); 67.91% qualified on income/wealth, 32.09% as experienced. **Label:** headline TRY 39.4m — single-source excerpt (title); all other figures — single-source, flagged inconsistent.
- **KOSGEB "Türkiye'deki KOBİ'lere İlişkin Bazı İstatistiki Göstergeler 2024"** PDF (webdosya.kosgeb.gov.tr) — result title confirmed; content NOT VERIFIED.

**Distinction:** 2.1–2.3 = general enterprise survival. No Turkish *technology-start-up* survival or closure rate was found; the only start-up-specific "survival" evidence is the graduation/follow-on statement ("weaker beyond seed") and the technopark spin-off study (29d).

---

## PART 3 — Global funnel benchmarks

### 3.1 CB Insights — "The Venture Capital Funnel"
- **URL:** https://www.cbinsights.com/research/venture-capital-funnel-2/ (result title "The Venture Capital Funnel" confirmed); regional version https://www.cbinsights.com/research/regional-vc-funnels/ ; commentary: Fred Wilson, AVC, "The 'VC Funnel'" (Feb 2018) https://avc.com/2018/02/the-vc-funnel/ ; Medium summaries of the 2014 edition (Khanorkar; Bouzoukas).
- **Rendered figures (summary-only; may mix 2014/2017/2018 editions):** "After an initial seed round, 54% of companies raise a 2nd round"; "61% of companies that raise a follow-on after their initial seed are then able to raise a second follow-on"; "less than 1%, 10 (0.91%) companies from their seed cohort ended up becoming unicorns"; roughly 21% acquired; "75% of companies are orphaned or die along the way".
- **Methodology (recollection — verify):** ~1,100 US tech companies that raised a first seed round in 2008–2010, tracked round by round to 2018 (2014 edition: ~1,000 companies seeded 2009–2010); "round" = successive priced financings as labelled by CB Insights; exit = M&A or IPO at any stage.
- **Label:** existence of the analysis — verified by 2+ independent excerpts (CB Insights page + AVC + Medium result titles); all numbers — single-source excerpt (summary-only).

### 3.2 Carta — seed-to-Series A graduation by cohort
- **URL:** https://carta.com/data/newsletter-graduation-rate-from-seed-to-series-a/ (result title "Graduation rate from seed to Series A" confirmed). Secondary: Chronograph https://www.chronograph.pe/current-trends-in-the-series-a-and-seed-venture-markets/ ("The Series A Crunch: Exploring Seed Graduation Rates"); Konvoy https://www.konvoy.vc/newsletters/failure-to-launch-the-series-a-crunch ; SaaStr https://www.saastr.com/the-state-of-seed-today-10-key-learnings-from-cartas-latest-data/ ; Incisive Ventures (June 2025) https://incisive.vc/2025/06/10/update-on-venture-graduation-rates/ ; Euclid Ventures "The Seed-Stage Reckoning".
- **Rendered figures (summary-only):** Q1 2018 seed cohort: 30.6% reached Series A within two years; 2018–2019: ~31% within two years; peak Q2 2020 cohort: ~40% within two years; 2021 cohort: 36% graduated beyond seed (window not stated); 2022 cohort: ~15% within two years.
- **Methodology (recollection — verify):** US companies with cap tables on Carta that raised a priced seed; graduation = priced Series A on Carta within 24 (or 36) months; attrition from Carta and unlabelled bridge rounds bias rates down.
- **Label:** existence — verified by 2+ independent excerpts (Carta + ≥4 secondary result titles referencing Carta's data); numbers — single-source excerpt (summary-only).

### 3.3 AngelList — https://www.angellist.com/blog/angellist-unicorn-rate (result title "What Percentage of AngelList Seed-Stage Startups…" confirmed). **Numbers NOT VERIFIED.**

### 3.4 Crunchbase / PitchBook / Dealroom seed→A conversion; other failure-rate sources — **NOT VERIFIED** (queries never ran). Candidates to check: Crunchbase News seed-to-Series-A analyses; PitchBook-NVCA Venture Monitor; Dealroom country benchmarks; Shikhar Ghosh (HBS) failure estimates as reported by the WSJ (2012).

---

## Suggested citation set for the EE
1. Puri & Zarutskie (2012) JF — survival advantage concentrated in early post-VC years; scale, not profitability.
2. Sørensen (2007) JF — sorting ≈ 2× influence (selection dominates).
3. Chemmanur, Krishnan & Nandy (2011) RFS — screening + monitoring; investor reputation matters.
4. Hellmann & Puri (2002) JF — professionalization.
5. Bernstein, Giroud & Townsend (2016) JF — causal monitoring effect.
6. Kerr, Lerner & Schoar (2014) RFS — angel funding raises survival/growth; no follow-on signalling.
7. Nanda & Rhodes-Kropf (2013) JFE + Gompers & Lerner (2000) JFE — cycles/over-funding.
8. Lerner & Nanda (2020) JEP — concentration among few investors/sectors/places.
9. Manigart, Baeyens & Van Hyfte (2002) + Cumming, Grilli & Murtinu (2017) — public vs private investor type and survival/exit.
10. Bertoni, Colombo & Grilli (2011) / Peneder (2010) / Croce, Martí & Murtinu (2013) — treatment effects in bank-based European economies closest to Türkiye.
Plus TÜİK (2025) 2024 business-demography bulletin (general survival baseline) and Startups.watch (2025) Year in Review (ecosystem funding/deal data).
