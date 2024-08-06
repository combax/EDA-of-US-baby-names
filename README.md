# EDA of American baby names:

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=py,mongo" />
  </a>
</p>

---

## Dataset used:

Data is taken from [ssa.gov](https://www.ssa.gov/oact/babynames/limits.html) which provides zip file containing multiple txts named by years, for example: yob1880.txt, yob1881.txt till yob2023.txt.
Text files have following format: Name,Gender, Occurrences i.e. Mary,F,6919.

---

## Conversion to json and upload:

- First txts were converted to json using python file **txt_to_json.py**.

- Then **mongo_upload.py** was used to upload it to local MongoDB server for analysis.

This project can also be done is MySQL, PostgreSQL or any database of your choice as long as it supports advanced querying.

---

## Analysis:

All code for below analysis is in **query.mongodb.js** file. While code for all graphs and word clouds is in **graphs.ipynb** file.

---

#### 1. Most common names throughout years:

- **Girls:** Mary, Elizabeth, Patricia, Jennifer, Linda, Barbara, Margaret, Susan.
- **Boys:** James, Robert, Michael, William, David, Joseph, Richard, Charles, Thomas.

![topnames](/images/top10names.png)

---

#### 2. Names that went out of fashion heavily:

- **Girls:** Mary, Patricia, Barbara, Linda, Susan, Dorothy, Betty, Jennifer, Margaret, Nancy.
- **Boys:** Robert, John, James, Richard, Michael, William, David, Charles, Donald, Thomas.

![female](/images/femaletrends.png)

![male](/images/maletrends.png)

---

#### 3. Most unique names:

Here we took least common used start letter for names:

- **Girls:** U(1863), X(2050), Q(2939), W(10362), Y(13353).
- **Boys:** X(1656), U(3228), Q(4059), Y(8900), Z(12184).

Then we find longest name that occurs least for uniqueness:

- **Girls:** Uniquewa, Ursaline, Ulyssa, Urhonda, Urszula.
- **Boys:** Xzaivier, Xazavier, Xaydrian, Xizavier, Xzaevion.

![fwc](/images/girlwordcloud.png)

![mwc](/images/boywordcloud.png)

---

#### 4.Year with highest number of babies named:

1. 1957-4202062 
2. 1959-4156721 
3. 1960-4153921 
4. 1961-4141953 
5. 1958-4134249

---

#### 5.Top years with females and male sex ratios:

1. **Female:Male**
    - 1901-2.2480
    - 1906-2.2177
    - 1905-2.2041
    - 1903-2.1972
    - 1899-2.1940

2. **Male:Female**
    - 1880-1.2143
    - 1881-1.0955
    - 1989-1.0853
    - 1993-1.0841
    - 1992-1.0831

---

#### 6. Year with most unique names:
Year - highest number of names of any year(male+female)
2008 - 32534 names

---

