use std::cmp::min;

pub fn output_dimensions(
  input_width: u32,
  input_height: u32,
  width: Option<u32>,
  height: Option<u32>,
  fit: Option<String>,
) -> (u32, u32) {
  let input_aspect_ratio = f64::from(input_width) / f64::from(input_height);

  match fit.as_deref() {
    Some("min") => {
      // https://docs.imgix.com/apis/rendering/size/fit#min
      // Resizes and crops the image to match the aspect ratio of the requested width and height.
      // Will not exceed the original width and height of the image.
      match (width, height) {
        (Some(width_value), Some(height_value)) => {
          if width_value < input_width && height_value < input_height {
            (width_value, height_value)
          }
          // requested height or width is larger than input image height
          else {
            let aspect_ratio = f64::from(width_value) / f64::from(height_value);
            // requested width is wider than input: set output width to input width and adjust
            // output height to match requested aspect ratio
            if aspect_ratio > input_aspect_ratio {
              (
                input_width,
                (f64::from(input_width) / aspect_ratio).round() as u32,
              )
            // requested height is taller than input: set output height to input height and adjust
            // output width to match requested aspect ratio
            } else {
              (
                (aspect_ratio * f64::from(input_height)).round() as u32,
                input_height,
              )
            }
          }
        }
        (_, _) => output_dimensions(
          input_width,
          input_height,
          None,
          None,
          Some(String::from("clip")),
        ),
      }
    }
    // preserve input aspect ratio
    Some("clip") | Some(_) | None => match (width, height) {
      (Some(width_value), Some(height_value)) => {
        let aspect_ratio = f64::from(width_value) / f64::from(height_value);
        // requested dimensions are for image taller than input
        if aspect_ratio < input_aspect_ratio {
          let output_width = min(width_value, input_width);
          (
            output_width,
            (f64::from(output_width) / input_aspect_ratio).round() as u32,
          )
        }
        // requested dimensions are for image wider than input
        else {
          let output_height = min(height_value, input_height);
          (
            (input_aspect_ratio * f64::from(output_height)).round() as u32,
            output_height,
          )
        }
      }
      (Some(width_value), None) => (
        width_value,
        (input_aspect_ratio / f64::from(width_value)).round() as u32,
      ),
      (None, Some(height_value)) => (
        (input_aspect_ratio * f64::from(height_value)).round() as u32,
        height_value,
      ),
      (None, None) => (input_width, input_height),
    },
  }
}

#[cfg(test)]
mod tests {
  use super::output_dimensions;

  #[test]
  fn output_dimensions_returns_expected_values_for_min_fit() {
    // prepare
    let input_width: u32 = 300;
    let input_height: u32 = 200;
    let mut width = Some(500u32);
    let mut height = Some(200u32);
    let fit = Some(String::from("min"));

    // assert
    assert_eq!(
      (300, 120),
      output_dimensions(input_width, input_height, width, height, fit.clone())
    );

    // prepare
    width = Some(200u32);
    height = Some(400u32);

    // assert
    assert_eq!(
      (100, 200),
      output_dimensions(input_width, input_height, width, height, fit.clone())
    );

    // prepare
    width = Some(600u32);
    height = Some(400u32);

    // assert
    assert_eq!(
      (300, 200),
      output_dimensions(input_width, input_height, width, height, fit.clone())
    );
  }

  #[test]
  fn output_dimensions_returns_expected_values_for_min_clip() {
    // prepare
    let input_width: u32 = 300;
    let input_height: u32 = 200;
    let width = Some(100u32);
    let height = Some(100u32);
    let fit = Some(String::from("clip"));

    // assert
    assert_eq!(
      (100, 67),
      output_dimensions(input_width, input_height, width, height, fit)
    );
  }

  #[test]
  fn output_dimensions_returns_expected_values_with_no_fit_specified() {
    // prepare
    let input_width: u32 = 300;
    let input_height: u32 = 200;
    let width = None;
    let height = None;
    let fit = None;

    // assert
    assert_eq!(
      (300, 200),
      output_dimensions(input_width, input_height, width, height, fit)
    );
  }
}
