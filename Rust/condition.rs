fn main(){
    let age = 20;

    if age < 18{
        println!("Can't drive");
    }
    else{
        println!("Drive")
    }

    let day = 4;
    match day {
        1 => println!("Monday"),
        2 => println!("Tuesday"),
        3 => println!("Wednesday"),
        4 => println!("Thursday"),
        5 => println!("Friday"),
        6 => println!("Saturday"),
        7 => println!("Sunday"),
        _ => println!("Invalid day."),
    }


    let result = match day {
        1 | 2 | 3 | 4 | 5 => "Weekday",
        6 | 7 => "Weekend",
        _ => "Invalid day",
    }

    let mut count = 1;
    while count <= 5 {
        println!("Count: {}", count);
        count += 1;
    }
}