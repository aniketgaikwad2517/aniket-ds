
window.EXPERIMENTS = [
{
id: 1,
title: "Linear Search and Binary Search",
file: "experiment_01_search.c",
code: `#include <stdio.h>

int linearsearch(int key, int roll[], int st) {
    for (int i = 0; i < st; i++)
        if (roll[i] == key) return i;
    return -1;
}

int binarysearch(int key, int roll[], int st) {
    int low = 0, high = st - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (roll[mid] == key) return mid;
        if (roll[mid] > key) high = mid - 1;
        else low = mid + 1;
    }
    return -1;
}

int main() {
    int key, st, search, i;
    char choice;
    printf("Enter number of students: ");
    scanf("%d", &st);
    if (st <= 0) return 1;
    int roll[st];

    do {
        printf("1. Linear Search\\n2. Binary Search\\n");
        scanf("%d", &search);

        if (search == 1 || search == 2) {
            for (i = 0; i < st; i++) {
                printf("Enter roll number: ");
                scanf("%d", &roll[i]);
            }
            printf("Enter roll number to search: ");
            scanf("%d", &key);

            int result = search == 1
                ? linearsearch(key, roll, st)
                : binarysearch(key, roll, st);

            if (result != -1)
                printf("Student attended the function.\\n");
            else
                printf("Student did not attend the function.\\n");
        } else printf("Invalid choice.\\n");

        printf("Continue (y/n): ");
        scanf(" %c", &choice);
    } while (choice != 'n' && choice != 'N');

    return 0;
}`
},
{
id: 2,
title: "Bubble Sort and Selection Sort",
file: "experiment_02_sorting.c",
code: `#include <stdio.h>

void bubblesort(int a[], int n) {
    for(int i=0;i<n-1;i++)
        for(int j=0;j<n-i-1;j++)
            if(a[j]>a[j+1]) {
                int temp=a[j];
                a[j]=a[j+1];
                a[j+1]=temp;
            }
}

void selectionsort(int a[], int n) {
    for(int i=0;i<n-1;i++) {
        int min=i;
        for(int j=i+1;j<n;j++)
            if(a[min]>a[j]) min=j;
        int temp=a[i];
        a[i]=a[min];
        a[min]=temp;
    }
}

void display(int a[], int n) {
    for(int i=0;i<n;i++) printf("%d ",a[i]);
}

int main() {
    int n,choice;
    printf("Enter array size: ");
    scanf("%d",&n);
    if(n<=0) return 1;
    int a[n];

    for(int i=0;i<n;i++) scanf("%d",&a[i]);

    printf("1. Bubble Sort\\n2. Selection Sort\\n");
    scanf("%d",&choice);

    if(choice==1) bubblesort(a,n);
    else if(choice==2) selectionsort(a,n);
    else return 1;

    display(a,n);

    printf("\\nTop five scores: ");
    for(int j=n-1,count=0;j>=0 && count<5;j--,count++)
        printf("%d ",a[j]);

    return 0;
}`
},
{
id: 3,
title: "Hashing – Linear, Quadratic and Double Probing",
file: "experiment_03_hashing.c",
code: `#include <stdio.h>
#define SIZE 10

int hashtable[SIZE];

void linear_probing(int key) {
    int index=(key%SIZE+SIZE)%SIZE;
    for(int i=0;i<SIZE;i++) {
        int pos=(index+i)%SIZE;
        if(hashtable[pos]==-1) {
            hashtable[pos]=key;
            return;
        }
    }
    printf("Hash table full\\n");
}

void quadratic_probing(int key) {
    int index=(key%SIZE+SIZE)%SIZE;
    for(int i=0;i<SIZE;i++) {
        int pos=(index+i*i)%SIZE;
        if(hashtable[pos]==-1) {
            hashtable[pos]=key;
            return;
        }
    }
    printf("No empty position\\n");
}

void double_hashing(int key) {
    int index1=(key%SIZE+SIZE)%SIZE;
    int index2=7-((key%7+7)%7);
    for(int i=0;i<SIZE;i++) {
        int pos=(index1+i*index2)%SIZE;
        if(hashtable[pos]==-1) {
            hashtable[pos]=key;
            return;
        }
    }
    printf("Hash table full\\n");
}

void display() {
    printf("\\nIndex\\tValue\\n");
    for(int i=0;i<SIZE;i++)
        printf("%d\\t%d\\n",i,hashtable[i]);
}

int main() {
    int key,choice;
    for(int i=0;i<SIZE;i++) hashtable[i]=-1;

    printf("1. Linear Probing\\n");
    printf("2. Quadratic Probing\\n");
    printf("3. Double Hashing\\n");
    scanf("%d",&choice);

    if(choice<1 || choice>3) return 1;

    printf("Enter 5 keys:\\n");
    for(int i=0;i<5;i++) {
        scanf("%d",&key);
        if(choice==1) linear_probing(key);
        else if(choice==2) quadratic_probing(key);
        else double_hashing(key);
    }

    display();
    return 0;
}`
},
{
id: 4,
title: "Pinnacle Club Member Management – Singly Linked List",
file: "experiment_04_linked_list.c",
code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Node {
    int prn;
    char name[50];
    struct Node *next;
} Node;

Node* createNode(int prn,char name[]) {
    Node *newNode=malloc(sizeof(Node));
    if(!newNode) return NULL;
    newNode->prn=prn;
    strcpy(newNode->name,name);
    newNode->next=NULL;
    return newNode;
}

Node* addPresident(Node *head,int prn,char name[]) {
    Node *newNode=createNode(prn,name);
    if(!newNode) return head;
    newNode->next=head;
    return newNode;
}

Node* addSecretary(Node *head,int prn,char name[]) {
    Node *newNode=createNode(prn,name);
    if(!newNode) return head;
    if(!head) return newNode;
    Node *temp=head;
    while(temp->next) temp=temp->next;
    temp->next=newNode;
    return head;
}

Node* addMember(Node *head,int prn,char name[]) {
    if(!head) return head;
    Node *newNode=createNode(prn,name);
    if(!newNode) return head;
    newNode->next=head->next;
    head->next=newNode;
    return head;
}

Node* deletePresident(Node *head) {
    if(!head) return NULL;
    Node *temp=head;
    head=head->next;
    free(temp);
    return head;
}

Node* deleteSecretary(Node *head) {
    if(!head) return NULL;
    if(!head->next) {
        free(head);
        return NULL;
    }
    Node *temp=head;
    while(temp->next->next) temp=temp->next;
    free(temp->next);
    temp->next=NULL;
    return head;
}

Node* deleteMember(Node *head,int prn) {
    if(!head) return NULL;
    if(head->prn==prn) return deletePresident(head);

    Node *temp=head,*prev=NULL;
    while(temp && temp->prn!=prn) {
        prev=temp;
        temp=temp->next;
    }
    if(!temp) return head;
    prev->next=temp->next;
    free(temp);
    return head;
}

int countMembers(Node *head) {
    int count=0;
    while(head) {
        count++;
        head=head->next;
    }
    return count;
}

void displayMembers(Node *head) {
    while(head) {
        printf("%d %s\\n",head->prn,head->name);
        head=head->next;
    }
}

Node* concatenateLists(Node *a,Node *b) {
    if(!a) return b;
    if(!b) return a;
    Node *temp=a;
    while(temp->next) temp=temp->next;
    temp->next=b;
    return a;
}

int main() {
    Node *divA=NULL,*divB=NULL;
    int choice,prn;
    char name[50];

    while(1) {
        printf("\\n1.Add President\\n2.Add Secretary\\n");
        printf("3.Add Member\\n4.Delete President\\n");
        printf("5.Delete Secretary\\n6.Delete Member\\n");
        printf("7.Display\\n8.Count\\n9.Concatenate\\n10.Exit\\n");
        scanf("%d",&choice);

        switch(choice) {
            case 1:
                scanf("%d %49s",&prn,name);
                divA=addPresident(divA,prn,name);
                break;
            case 2:
                scanf("%d %49s",&prn,name);
                divA=addSecretary(divA,prn,name);
                break;
            case 3:
                scanf("%d %49s",&prn,name);
                divA=addMember(divA,prn,name);
                break;
            case 4: divA=deletePresident(divA); break;
            case 5: divA=deleteSecretary(divA); break;
            case 6:
                scanf("%d",&prn);
                divA=deleteMember(divA,prn);
                break;
            case 7: displayMembers(divA); break;
            case 8: printf("Total: %d\\n",countMembers(divA)); break;
            case 9:
                divB=addPresident(divB,201,"Rohan");
                divB=addSecretary(divB,202,"Sneha");
                divA=concatenateLists(divA,divB);
                divB=NULL;
                break;
            case 10:
                while(divA) {
                    Node *temp=divA;
                    divA=divA->next;
                    free(temp);
                }
                return 0;
            default: printf("Invalid choice\\n");
        }
    }
}`
},
{
id: 5,
title: "Cinemax Theatre Seat Booking – Doubly Linked List",
file: "experiment_05_theatre.c",
code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Seat {
    int seatNo;
    int booked;
    struct Seat *prev;
    struct Seat *next;
} Seat;

Seat *head=NULL,*tail=NULL;

void initializeSeats(int n) {
    for(int i=1;i<=n;i++) {
        Seat *newSeat=malloc(sizeof(Seat));
        if(!newSeat) return;
        newSeat->seatNo=i;
        newSeat->booked=0;
        newSeat->prev=tail;
        newSeat->next=NULL;

        if(!head) head=newSeat;
        else tail->next=newSeat;
        tail=newSeat;
    }
}

void displayAvailableSeats() {
    Seat *temp=head;
    printf("Available Seats: ");
    while(temp) {
        if(!temp->booked) printf("%d ",temp->seatNo);
        temp=temp->next;
    }
    printf("\\n");
}

void bookSeat(int seatNo) {
    Seat *temp=head;
    while(temp) {
        if(temp->seatNo==seatNo) {
            if(temp->booked)
                printf("Already booked\\n");
            else {
                temp->booked=1;
                printf("Seat booked\\n");
            }
            return;
        }
        temp=temp->next;
    }
    printf("Seat does not exist\\n");
}

void cancelBooking(int seatNo) {
    Seat *temp=head;
    while(temp) {
        if(temp->seatNo==seatNo) {
            if(!temp->booked)
                printf("Seat is not booked\\n");
            else {
                temp->booked=0;
                printf("Booking cancelled\\n");
            }
            return;
        }
        temp=temp->next;
    }
    printf("Seat does not exist\\n");
}

void displayAllSeats() {
    Seat *temp=head;
    while(temp) {
        printf("Seat %d : %s\\n",temp->seatNo,
        temp->booked?"Booked":"Available");
        temp=temp->next;
    }
}

void freeSeats() {
    Seat *temp=head;
    while(temp) {
        Seat *next=temp->next;
        free(temp);
        temp=next;
    }
    head=tail=NULL;
}

int main() {
    int n,choice,seatNo;
    printf("Enter number of seats: ");
    scanf("%d",&n);
    if(n<=0) return 1;

    initializeSeats(n);

    do {
        printf("\\n1.Display Available Seats\\n");
        printf("2.Book Seat\\n3.Cancel Booking\\n");
        printf("4.Display All Seats\\n5.Exit\\n");
        scanf("%d",&choice);

        switch(choice) {
            case 1: displayAvailableSeats(); break;
            case 2:
                scanf("%d",&seatNo);
                bookSeat(seatNo);
                break;
            case 3:
                scanf("%d",&seatNo);
                cancelBooking(seatNo);
                break;
            case 4: displayAllSeats(); break;
            case 5: break;
            default: printf("Invalid choice\\n");
        }
    } while(choice!=5);

    freeSeats();
    return 0;
}`
},
{
id: 6,
title: "Infix to Postfix Conversion and Evaluation",
file: "experiment_06_infix_postfix.c",
code: `#include <stdio.h>
#include <ctype.h>
#define MAX 256

int precedence(char op) {
    if(op=='*') return 2;
    if(op=='+' || op=='-') return 1;
    return 0;
}

int infixToPostfix(char infix[],char postfix[]) {
    char stack[MAX];
    int top=-1,out=0;

    for(int i=0;infix[i]!='\\0';i++) {
        char ch=infix[i];
        if(isspace((unsigned char)ch)) continue;

        if(isdigit((unsigned char)ch))
            postfix[out++]=ch;
        else if(ch=='(')
            stack[++top]=ch;
        else if(ch==')') {
            while(top>=0 && stack[top]!='(')
                postfix[out++]=stack[top--];
            if(top<0) return 0;
            top--;
        }
        else if(ch=='+' || ch=='-' || ch=='*') {
            while(top>=0 && stack[top]!='(' &&
                precedence(stack[top])>=precedence(ch))
                postfix[out++]=stack[top--];
            stack[++top]=ch;
        }
        else return 0;
    }

    while(top>=0) {
        if(stack[top]=='(') return 0;
        postfix[out++]=stack[top--];
    }
    postfix[out]='\\0';
    return 1;
}

int evaluatePostfix(char postfix[],int *result) {
    int stack[MAX],top=-1;

    for(int i=0;postfix[i]!='\\0';i++) {
        char ch=postfix[i];

        if(isdigit((unsigned char)ch))
            stack[++top]=ch-'0';
        else {
            if(top<1) return 0;
            int right=stack[top--];
            int left=stack[top--];

            if(ch=='+') stack[++top]=left+right;
            else if(ch=='-') stack[++top]=left-right;
            else if(ch=='*') stack[++top]=left*right;
            else return 0;
        }
    }

    if(top!=0) return 0;
    *result=stack[top];
    return 1;
}

int main() {
    char infix[MAX],postfix[MAX];
    int result;

    printf("Enter infix expression: ");
    if(!fgets(infix,sizeof(infix),stdin)) return 1;

    if(!infixToPostfix(infix,postfix)) {
        printf("Invalid expression\\n");
        return 1;
    }

    if(!evaluatePostfix(postfix,&result)) {
        printf("Cannot evaluate expression\\n");
        return 1;
    }

    printf("Postfix: %s\\n",postfix);
    printf("Result: %d\\n",result);
    return 0;
}`
},
{
id: 7,
title: "Pizza Parlour Order Processing – Queue",
file: "experiment_07_pizza_queue.c",
code: `#include <stdio.h>
#define MAX 100

struct Order {
    int orderNo;
    char customerName[50];
    char pizza[50];
};

struct Order queue[MAX];
int front=-1,rear=-1;

void placeOrder() {
    if(rear==MAX-1) {
        printf("Queue is full\\n");
        return;
    }

    struct Order newOrder;
    printf("Enter order number: ");
    scanf("%d",&newOrder.orderNo);
    printf("Enter customer name: ");
    scanf("%49s",newOrder.customerName);
    printf("Enter pizza name: ");
    scanf("%49s",newOrder.pizza);

    if(front==-1) front=0;
    queue[++rear]=newOrder;
    printf("Order placed successfully\\n");
}

void processOrder() {
    if(front==-1) {
        printf("No orders to process\\n");
        return;
    }

    printf("Order: %d\\n",queue[front].orderNo);
    printf("Customer: %s\\n",queue[front].customerName);
    printf("Pizza: %s\\n",queue[front].pizza);

    front++;
    if(front>rear) front=rear=-1;
}

void displayOrders() {
    if(front==-1) {
        printf("No pending orders\\n");
        return;
    }

    for(int i=front;i<=rear;i++)
        printf("%d %s %s\\n",queue[i].orderNo,
        queue[i].customerName,queue[i].pizza);
}

int main() {
    int choice;
    do {
        printf("\\n1.Place Order\\n2.Process Order\\n");
        printf("3.Display Orders\\n4.Exit\\n");
        scanf("%d",&choice);

        switch(choice) {
            case 1: placeOrder(); break;
            case 2: processOrder(); break;
            case 3: displayOrders(); break;
            case 4: break;
            default: printf("Invalid choice\\n");
        }
    } while(choice!=4);

    return 0;
}`
},
{
id: 8,
title: "Binary Search Tree – Insert, Search, Delete and Traversals",
file: "experiment_08_bst.c",
code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left,*right;
};

struct Node* createNode(int value) {
    struct Node *newNode=malloc(sizeof(struct Node));
    if(!newNode) exit(1);
    newNode->data=value;
    newNode->left=newNode->right=NULL;
    return newNode;
}

struct Node* insert(struct Node *root,int value) {
    if(!root) return createNode(value);
    if(value<root->data)
        root->left=insert(root->left,value);
    else if(value>root->data)
        root->right=insert(root->right,value);
    else printf("Duplicate value not allowed\\n");
    return root;
}

struct Node* search(struct Node *root,int value) {
    if(!root || root->data==value) return root;
    if(value<root->data)
        return search(root->left,value);
    return search(root->right,value);
}

struct Node* findMin(struct Node *root) {
    while(root && root->left) root=root->left;
    return root;
}

struct Node* deleteNode(struct Node *root,int value) {
    if(!root) return NULL;

    if(value<root->data)
        root->left=deleteNode(root->left,value);
    else if(value>root->data)
        root->right=deleteNode(root->right,value);
    else {
        if(!root->left && !root->right) {
            free(root);
            return NULL;
        }
        if(!root->left) {
            struct Node *temp=root->right;
            free(root);
            return temp;
        }
        if(!root->right) {
            struct Node *temp=root->left;
            free(root);
            return temp;
        }
        struct Node *temp=findMin(root->right);
        root->data=temp->data;
        root->right=deleteNode(root->right,temp->data);
    }
    return root;
}

void inorder(struct Node *root) {
    if(root) {
        inorder(root->left);
        printf("%d ",root->data);
        inorder(root->right);
    }
}

void preorder(struct Node *root) {
    if(root) {
        printf("%d ",root->data);
        preorder(root->left);
        preorder(root->right);
    }
}

void postorder(struct Node *root) {
    if(root) {
        postorder(root->left);
        postorder(root->right);
        printf("%d ",root->data);
    }
}

int main() {
    struct Node *root=NULL,*result;
    int choice,value;

    do {
        printf("\\n1.Insert\\n2.Search\\n3.Delete\\n");
        printf("4.Inorder\\n5.Preorder\\n6.Postorder\\n7.Exit\\n");
        scanf("%d",&choice);

        switch(choice) {
            case 1:
                scanf("%d",&value);
                root=insert(root,value);
                break;
            case 2:
                scanf("%d",&value);
                result=search(root,value);
                printf(result?"Found\\n":"Not found\\n");
                break;
            case 3:
                scanf("%d",&value);
                if(search(root,value))
                    root=deleteNode(root,value);
                else printf("Value not found\\n");
                break;
            case 4: inorder(root); printf("\\n"); break;
            case 5: preorder(root); printf("\\n"); break;
            case 6: postorder(root); printf("\\n"); break;
            case 7: break;
            default: printf("Invalid choice\\n");
        }
    } while(choice!=7);

    return 0;
}`
},
{
id: 9,
title: "Graph Connectivity using Depth First Search (DFS)",
file: "experiment_09_graph_dfs.c",
code: `#include <stdio.h>
#include <stdlib.h>
#define MAX 20

struct Node {
    int city;
    struct Node *next;
};

struct Node *adj[MAX];
int visited[MAX];
int n;

void addEdge(int u,int v) {
    struct Node *newNode=malloc(sizeof(struct Node));
    if(!newNode) exit(1);
    newNode->city=v;
    newNode->next=adj[u];
    adj[u]=newNode;
}

void DFS(int city) {
    visited[city]=1;
    for(struct Node *temp=adj[city];temp;temp=temp->next)
        if(!visited[temp->city])
            DFS(temp->city);
}

int main() {
    int edges,u,v,connected=1;

    printf("Enter number of cities: ");
    scanf("%d",&n);
    if(n<=0 || n>MAX) return 1;

    for(int i=0;i<n;i++) {
        adj[i]=NULL;
        visited[i]=0;
    }

    printf("Enter number of flight paths: ");
    scanf("%d",&edges);

    for(int i=0;i<edges;i++) {
        scanf("%d %d",&u,&v);
        if(u<0 || u>=n || v<0 || v>=n) {
            printf("Invalid city number\\n");
            return 1;
        }
        addEdge(u,v);
        addEdge(v,u);
    }

    DFS(0);

    for(int i=0;i<n;i++)
        if(!visited[i]) connected=0;

    if(connected)
        printf("The graph is connected.\\n");
    else
        printf("The graph is not connected.\\n");

    for(int i=0;i<n;i++) {
        struct Node *temp=adj[i];
        while(temp) {
            struct Node *next=temp->next;
            free(temp);
            temp=next;
        }
    }

    return 0;
}`
}
];
