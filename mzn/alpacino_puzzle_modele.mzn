include "globals.mzn"; 

/*====== Modele dzn ======*/
array[1..5] of var personne: Personne_dzn;
array[1..5] of var film: Film_dzn;
array[1..5] of var jour: Jour_dzn;
array[1..5]of var horaire:Horaire_dzn;

constraint forall(i in 1..5)(exists(j in 1..5)(Personne[j] == Personne_dzn[i] /\ Film[j]== Film_dzn[i] /\ Jour[j]==Jour_dzn[i] /\ Horaire[j] == Horaire_dzn[i]));
/*================*/

set of int :personne=1..5;
int :Jessica=1;
int :Laurie=2;
int :Mark=3;
int :Masry=4;
int :Sally=5;
array[personne] of int:sexe=[0,1,1,0,0];
array[personne] of string:Personne_affich=["Jessica","Laurie","Mark","Masry","Sally"];


array[personne] of var personne :Personne;  
%===========
set of int:film=1..5;
int: Donnie_Brasco=1;
int: The_Recruit=2;
int: Scarecrow=3;
int: minutes_88=4;
int: Scarface=5;
array[film] of string:Film_affich=["Donnie_Brasco","The_recruit","Scarcrow","88_Minutes","Scarface"];

array[film] of int : date=[1997,2003,1973,2007,1983];
array[personne] of var film:Film;
%===========
set of int :jour=1..5;
int: Lundi=1;
int: Mardi=2;
int: Mercredi=3;
int: Jeudi=4;
int: Vendredi=5;
array[jour] of string:Jour_Affich=["Lundi","Mardi","Mercredi","Jeudi","Vendredi"];


array[personne] of var jour:Jour;

array[film] of var jour:Jour_f;

%array[horaire] of var jour:Jour_h;
%===========
set of int:horaire={735,740,820,830,845};
%set of int:horaire=1..5;

int: Horaire_1=1;
int: Horaire_2=2;
int: Horaire_3=3;
int: Horaire_4=4;
int: Horaire_5=5;
array[1..5] of int:Horaire_value=[735,740,820,830,845];
array[1..5] of string:Horaire_affich=["7h35","7h40","8h20","8h30","8h45"];

%array[jour] of var horaire:Horaire_j;
array[film] of var horaire:Horaire;
%===========

%constraint Horaire[minutes_88] != 820;

constraint all_different(Jour);
constraint all_different(Jour_f);
constraint all_different(Horaire);
constraint all_different(Personne);
constraint all_different(Film);

constraint Film[Mark] == Scarecrow;
constraint Horaire[Scarecrow] == Horaire[Scarface]+105;
constraint Film[Jessica] != minutes_88 /\ Film[Jessica]!= The_Recruit;
constraint ((Jour[Masry] mod 2 )+(Jour[Jessica] mod 2 )) ==2;  

constraint exists(i in personne)(sexe[i] == 1 /\ (Horaire[i]<800 /\ Jour[i] != Mercredi ) );

constraint exists(i in personne)(sexe[i] == 0 /\ (Horaire[i]<800 /\ Jour[i] != Mercredi ) );

constraint Jour_f[The_Recruit]== Vendredi;

%constraint forall(i in film)((Horaire[i] <800 ) /\ ( exists(j in i-1..i+1)({j} intersect film != {} /\ Horaire[j] <800 )  ));

%constraint forall(i in film)((Horaire[i] >= 800 )/\( exists(j in i-1..i+1)({j} intersect film != {} /\ Horaire[j] >=800 )  ));


constraint forall(i in film)(if(Horaire[i] <800 ) then  ( exists(j in i-1..i+1)({j} intersect film != {} /\ Horaire[j] <800 )  ) endif);

constraint forall(i in film)(if(Horaire[i] >= 800 )then ( exists(j in i-1..i+1)({j} intersect film != {} /\ Horaire[j] >=800 )  ) endif);

%constraint forall(i in film)((Horaire[i] < 800  )->(Horaire[i-1] < 800 \/ Horaire[i+1] < 800));

%constraint forall(i in film)((Horaire[i] >= 800)->(Horaire[i-1] >= 800 \/ Horaire[i+1] >= 800));

%constraint exists(i in personne)((sexe[i] == 0)/\ (Jour[i] mod 2)==0); 

constraint sum(i in personne)(if (sexe[i]==0) then (Jour[i] mod 2 ) else 0 endif)==2;

constraint Horaire[Donnie_Brasco] == 730 \/ Horaire[Donnie_Brasco] == 830;

constraint forall(i in film)(if (date[i]>=2000) then ( Jour_f[i] == Lundi \/Jour_f[i] == Vendredi) endif );

constraint exists(i in film)( (Jour_f[i] == Jeudi)  /\ Horaire[minutes_88] == Horaire[i]+80 );

constraint forall(i in personne)(Jour_f[Film[i]] == Jour[i] );

/*==================*//*
constraint  lex_lesseq(array1d(Film), [ Film[i] | i in personne]);
constraint  lex_lesseq(array1d(Film), [ Film[i] | i in reverse(personne) ]);

constraint  lex_lesseq(array1d(Jour), [ Jour[i] | i in personne]);
constraint  lex_lesseq(array1d(Jour), [ Jour[i] | i in reverse(personne) ]);*/

/*
constraint  lex_lesseq(array1d(Horaire), [ Horaire[i] | i in film]);
constraint  lex_lesseq(array1d(Horaire), [ Horaire[i] | i in reverse(film) ]);*/

%constraint forall(i,j in personne where i<j)(Jour[i]<Jour[j]);

/*===================*/



solve satisfy;
output["True"];
%output["First try"++show(Jour_Affich[fix(Jour[i])])++" "++show(Personne_affich[i])++" "++show(Film_affich[fix(Film[i])])++" "++show(Horaire[fix(Film[i])])++"\n"| i in personne]
