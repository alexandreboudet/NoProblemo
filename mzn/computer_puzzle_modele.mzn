include "globals.mzn"; 

set of int :ordinateur =1..5;


/*  Lien dzn */
array[1..5] of var monitor: Monitor_dzn;
array[1..5] of var processor: Processor_dzn;
array[1..5] of var hard_disk: Hard_disk_dzn;
array[1..5]of var price:Price_dzn;

constraint forall(i in 1..5)(exists(j in 1..5)(Monitor[j] == Monitor_dzn[i] /\ Processor[j]== Processor_dzn[i] /\ Hard_disk[j]==Hard_disk_dzn[i] /\ Price[j] == Price_dzn[i]));


%===========
array[ordinateur] of string:Ordinateur_affich=["ordi 1"," ordi 2","ordi 3","ordi 4","ordi 5"];
array[ordinateur] of var ordinateur:Ordinateur;
int : my_pc=1;
%===========
set of int :monitor=1..5;
int :m130 = 1 ;
int :m150 = 2 ;
int :m155 = 3 ;
int :m215 = 4 ;
int :m270 = 5 ;
array[monitor] of int:taille=[130,150,155,215,270];
array[monitor] of string:Monitor_affich=["13 pouce"," 15 pouce","15.6 pouce","21.5 pouce","27 pouce"];


array[ordinateur] of var monitor :Monitor;  
%===========

set of int: processor=1..5;

int: mzh20=1;
int: mzh23=2;
int: mzh25=3;
int: mzh27=4;
int: mzh31=5;
array[processor] of string:Processor_affich=["2.0 MHZ","2.3 MHZ","2.5 MHZ","2.7 MHZ","3.1 MHZ"];

set of int : processor_va={20,23,25,27,31};
array[processor] of int : processor_value=[20,23,25,27,31];
array[ordinateur] of var processor:Processor;
%===========
set of int : hard_disk=1..5;
int: gb250=1;
int: gb320=2;
int: gb500=3;
int: gb750=4;
int: gb1024=5;
array[hard_disk] of string:Jour_Affich=["250 Gb","320 Gb","500 Gb","750 Gb","1024 Gb"];

array[hard_disk] of int:hard_value=[250,320,500,750,1024];
array[ordinateur] of var hard_disk:Hard_disk;


%array[horaire] of var jour:Jour_h;
%===========
%set of int:horaire={735,740,820,830,845};
set of int:price=1..5;
set of int:price_val={699,999,1149,1349,1649};

int: price_699=1;
int: price_999=2;
int: price_1149=3;
int: price_1349=4;
int: price_1649=5;
array[price] of int:price_value=[699,999,1149,1349,1649];
array[price] of string:Horaire_affich=["699 $","999$","1149 $","1349 $","1649 $"];

%array[jour] of var horaire:Horaire_j;
array[ordinateur] of var price_val:Price_val;
array[ordinateur] of var price:Price;
%===========
%constraint Horaire[minutes_88] != 820;

constraint all_different(Monitor);
constraint all_different(Processor);
constraint all_different(Price);
constraint all_different(Hard_disk);
constraint all_different(Ordinateur);

constraint all_different(processor_value);
constraint all_different(price_value);
/* Contraitne 1*/

%constraint exists(i in ordinateur)((Monitor[i]== m215) /\(Processor[i] == mzh23 \/ Processor[i] == mzh27)/\ Price[i]!=price_999 /\ Price[i]!=price_1649 ) ;
%constraint Price[my_pc] == price_699 \/ Price[my_pc] == price_1349;

constraint Monitor[my_pc]!=m215;

/******/
constraint all_different(Price_val);
function var bool:donne_valeur(var int:place)=price_value[Price[place]]==Price_val[place];
constraint forall(i in ordinateur)(donne_valeur(i) == true);
/******/

constraint exists(i,j in 2..5 where i!=j /\ i<j)((Price_val[i] == Price_val[my_pc]+300 ) /\ Monitor[j]==m215 /\ processor_value[Processor[i]] == processor_value[Processor[j]]+4);

/* Contraitne 3*/

constraint exists(i in ordinateur)((Hard_disk[i] == gb320/\Processor[i] == mzh20)\/(Hard_disk[i] == gb320/\ Processor[i] == mzh23));

constraint exists(i in ordinateur)((Monitor[i] ==m150 ) /\ Price[i] != price_1349);

constraint exists(i in ordinateur)( (Monitor[i] ==m150 ) /\ Price[i] != price_999 );

constraint exists(i,j in ordinateur where i!=j)( (Monitor[i] ==m150 /\ Price[j] == price_999) /\(processor_value[Processor[i]]>processor_value[Processor[j]]));

constraint exists(i,j in ordinateur where i!=j)( (Monitor[i] ==m150 /\ Price[j] == price_1349)/\(processor_value[Processor[i]]<processor_value[Processor[j]]));

/*contrainte 4*/

constraint exists(i in ordinateur)((Monitor[i] == m270)/\ (Hard_disk[i] != gb320));
constraint exists(i in ordinateur)((Price[i] == price_699)/\ (Hard_disk[i] != gb320));
constraint exists(i in ordinateur)((Hard_disk[i] == gb500)/\(Price[i] != price_699));
constraint exists(i,j in ordinateur where i!=j /\ i<j)( (Hard_disk[i] == gb500 /\ Price[j]==price_699) /\ (processor_value[Processor[i]]>processor_value[Processor[j]] /\ taille[Monitor[i]]>taille[Monitor[j]]));


/* Contrainte 2*/

constraint Monitor[my_pc]!=m270;
constraint exists(i in 2..5)((Processor[i] == mzh20) /\ ( Hard_disk[i] != gb250 /\Price[i] != price_1149));


constraint exists(i in 2..5)((Hard_disk[i] == gb250 ) /\ ( Processor[i] != mzh20 /\Price[i] != price_1149));


constraint exists(i in 2..5)((Price[i] = price_1149 )/\ ( Processor[i] != mzh20 /\ Hard_disk[i] != gb250 ));

constraint exists(i in ordinateur)(Hard_disk[i] > Hard_disk[my_pc] /\ Processor[i] != mzh20 /\ Hard_disk[i] != gb250 /\ Price[i] != price_1149);

constraint exists(i in 2..5)((Monitor[i]!= m150 /\ Processor[i]!=mzh27 /\ Processor[i] != mzh20 /\ Hard_disk[i] != gb250 /\ Price[i] != price_1149) /\ (Hard_disk[i] > Hard_disk[my_pc]) ) ;

constraint exists(i,j in 2..5 where i!=j)((Processor[j] == mzh27 /\ Processor[i]!=mzh27/\ Monitor[i]!= m150 /\ Processor[i] != mzh20 /\ Hard_disk[i] != gb250 /\ Price[i] != price_1149)/\(Hard_disk[i]<Hard_disk[j]));

/*Symettry breaking*/

constraint  lex_lesseq(array1d(Monitor), [ Monitor[i] | i in ordinateur]);
constraint  lex_lesseq(array1d(Monitor), [ Monitor[i] | i in reverse(ordinateur) ]);

constraint  lex_lesseq(array1d(Processor), [ Processor[i] | i in ordinateur]);
constraint  lex_lesseq(array1d(Processor), [ Processor[i] | i in reverse(ordinateur) ]);

constraint Processor[2] == mzh20;
constraint Hard_disk[3] == gb250;




solve satisfy;
output["True"];
%output["First try"++show(i)++" "++show(Ordinateur_affich[i])++" "++show(Monitor_affich[fix(Monitor[i])])++" "++show(Processor_affich[fix(Processor[i])])++" "++show(Jour_Affich[fix(Hard_disk[i])])++" "++show(Horaire_affich[fix(Price[i])])++show(Price_val[i])++"\n"| i in ordinateur]
