//1. Common way to implement the sum of integers - Looping
export const sum_to_n_a = function(n) {
    if (n <= 0) return 0; //omiting negative integers

    let sum = 0
    for(let i=1; i<=n; i++){
        sum += i
    }
    return sum;
};

//Solution using reduce
export const sum_to_n_b = function(n) {
    if (n <= 0) return 0; //omiting negative integers

    return Array.from({length:n},(_,i) => i+1).reduce((x, y) => {
      return x + y
    },0);
};

//Solution using arithmetic formule
export const sum_to_n_c = function(n) {
    if (n <= 0) return 0; //omiting negative integers

    return (n*(n+1))/2
};

console.log("Result A = ", sum_to_n_a(5))

console.log("Result B = ", sum_to_n_b(10))

console.log("Result C = ", sum_to_n_c(15))
