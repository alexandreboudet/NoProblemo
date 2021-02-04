% Use this editor as a MiniZinc scratch book
include "globals.mzn"; 

set of int: choix = 1..5;

int :Blue = 1;
int :Brown = 1;
int :Andrea = 1;
int :Farfalle = 1;
int :Australian = 1;
int :Trente = 1;

int :Green = 2;
int :Davis = 2;
int :Holly = 2;
int :Lasagne = 2;
int :Argentine = 2;
int :Trentecinq = 2;

int :Red = 3;
int :Lopes = 3;
int :Julie = 3;
int :Penne = 3;
int :Chilean = 3;
int :Quarante = 3;

int :White = 4;
int :Miller = 4;
int :Leslie = 4;
int :Spaghetti = 4;
int :French = 4;
int :Quarantecinq = 4;

int :Yellow = 5;
int :Wilson = 5;
int :Victoria = 5;
int :Ravioli = 5;
int :Italia = 5;
int :Cinquante = 5;

array[choix] of var choix: Shirt; %Blue, green, red, white, yellow
array[choix] of var choix: Name; %Andrea, Holly, Julie, Leslie, Victoria
array[choix] of var choix: Surname; %Brown, Davis, Lopes, Miller, Wilson 
array[choix] of var choix: Pasta; %farfalle, lasagne, penne, spaghetti, ravioli
array[choix] of var choix: Wine; %Australian, Argentine, Chilean, French, Italia
array[choix] of var choix: Age; %30 years, 35 years, 40 years, 45 years, 50 years

constraint all_different(Shirt);
constraint all_different(Name);
constraint all_different(Surname);
constraint all_different(Pasta);
constraint all_different(Wine);
constraint all_different(Age);

%The woman wearing the White shirt is next to the woman who likes Lombardian wines.
constraint Shirt[White]=Wine[Italia]+1 \/ Shirt[White]=Wine[Italia]-1;

%Ms Miller is somewhere between Ms Davis and Ms Brown, in that order.
constraint Surname[Davis]<Surname[Miller];
constraint Surname[Brown]>Surname[Miller];   

%The youngest woman is at the third position.
constraint Age[Trente] == 3;

%The 45 years old woman is somewhere to the right of the woman wearing the Red shirt.
constraint Age[Quarantecinq]>Shirt[Red];

%The woman who likes Chilean wines also likes Farfalle.
constraint Wine[Chilean]=Pasta[Farfalle];

%At the first position is the woman that likes Argentine wines.
constraint Wine[Argentine]=1;

%Andrea is exactly to the right of the 35 years old woman.
constraint Name[Andrea] = Age[Trentecinq]+1;

%The woman wearing the Blue shirt is somewhere between Ms Davis and Holly, in that order.
constraint Shirt[Blue] > Surname[Davis];
constraint Shirt[Blue] < Name[Holly];

%Victoria is next to Leslie.
constraint Name[Victoria] = Name[Leslie]+1 \/ Name[Victoria] = Name[Leslie]-1;

%The woman wearing the Red shirt is somewhere to the left of the woman who likes Australian wines.
constraint Shirt[Red] < Wine[Australian];

%Ms Wilson is next to the 30 years old woman.
constraint Surname[Wilson] = Age[Trente] + 1 \/ Surname[Wilson] = Age[Trente] - 1;

%Leslie is exactly to the left of the 30 years old woman.
constraint Name[Leslie] = Age[Trente] - 1;

%Holly is somewhere to the right of the woman wearing the Red shirt.
constraint Name[Holly] > Shirt[Red];

%Ms Brown is exactly to the left of Julie.
constraint Surname[Brown] = Name[Julie] -1;

%The youngest woman likes Penne.
constraint Age[Trente] = Pasta[Penne];

%Ms Wilson is wearing the White shirt.
constraint Surname[Wilson] = Shirt[White];

%The woman who likes Lasagne is somewhere between the woman who likes Italian wines and the woman who likes Spaghetti, in that order.
constraint Pasta[Lasagne] > Wine[Italia];
constraint Pasta[Lasagne] < Wine[Spaghetti];

%At the second position is the woman wearing the Blue shirt.
constraint Shirt[Blue] = 2;

%The 40 years old woman likes Lasagne.
constraint Age[Quarante] = Pasta[Lasagne];

%Ms Lopes is at the fifth position.
constraint Surname[Lopes] = 5;

%The woman that likes Australian wines is somewhere between Victoria and the woman who likes wines from Bordeaux, in that order.
constraint Wine[Australian] > Name[Victoria];
constraint Wine[Australian] < Wine[French];

%The woman wearing the Yellow shirt is exactly to the left of the 35 years old woman.
constraint Shirt[Yellow] =  Age[Trentecinq] - 1;

solve satisfy;
output["True"];
/*
array[choix] of string:Couleur_affich=["Bleu","Vert","Rouge","Blanc","Jaune"];
array[choix] of string:Pasta_affich=["Farfalle","Lasagne","Penne","Spaghetti","Ravioli"];
array[choix] of string:Age_affich=["30 ans","35 ans","40 ans","45 ans","50 ans"];
array[choix] of string:Wine_affich=["Australien","Argentine","Chilie","France","Italie"];
array[choix] of string:Name_affich=["Andrea","Holly","Julie","Leslie","Victoria"];
array[choix] of string:Surname_affich=["Brown","David","Lopes","Miller","Wilson"];
output[""++show(Name_affich[fix(Name[i])])++" "++show(Surname_affich[fix(Surname[i])])++" "++show(Wine_affich[fix(Wine[i])])++" "++show(Age_affich[fix(Age[i])])++" "++show(Pasta_affich[fix(Pasta[i])])++show(Couleur_affich[fix(Shirt[i])])++" "++" "++"\n" | i in choix];*/
