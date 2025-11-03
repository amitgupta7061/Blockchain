fn main() {
    println!("{}", add_number(5, 6));

    let str = String::from("Hello world");
    finder(str);   // gives full ownership
    
    let name = String::from("Amit Gupta");
    immutable_borrow(&name); // giving to read data permission

    let mut title = String::from("Gupta");
    mutable_borrow(&mut title); // read and write permission 

    // at a same time giving permission to multiple person for read can possible
    let word = String::from("Kaise Ho!!");
    let p1 = &word;
    let p2 = &word;

    // but can't give permission to write at a time to multiple person
}

fn add_number(x: i32, y: i32) -> i32 {
    return x + y;
}

fn finder(s: String){ // s take ownership of str
    println!("{}", s);
}

// Immutable -> read then return ownership
// mutable   -> read and write 

fn immutable_borrow(s: &String){  // borrowing to read data then return ownership
    println!("{}", s);
}

fn mutable_borrow(s: &mut String){
    s.push_str("_Amit");
    println!("{}", s);
}