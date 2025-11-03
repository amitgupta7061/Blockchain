use std::collections::HashMap;

fn main() {
    let nums = [10, 20, 30, 40, 50];  // fixed size -> space in stack
    println!("{}", nums[0]);


    let tup = (10, 20, true, "Amit");
    println!("{}", tup.1);
    println!("{:?}", tup);


    let mut fruits = vec!["apple", "banana"];
    fruits.push("cherry");

    println!("Last fruit: {}", fruits[2]);


    let mut capitalCities = HashMap::new();
    capitalCities.insert("France", "Paris");
    capitalCities.insert("Japan", "Tokyo");

    println!("Capital of Japan is {}", capitalCities["Japan"]);

}